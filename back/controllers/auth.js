import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import {createSite} from "./siteController.js";

export const updateUser = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, dotenv.config().parsed.JWT_SECRET);

    const { username, email, company, oldPassword, newPassword} = req.body;

    let updateFields = [];
    let updateValues = [];

    let siteUrl = 0;

    if (username) {
        updateFields.push("username = ?");
        updateValues.push(username);
    }

    if (email) {
        updateFields.push("email = ?");
        updateValues.push(email);
    }

    if (company) {
        // Checking for unique company name before updating
        connection.query(
            "SELECT COUNT(DISTINCT langId) as count FROM sites WHERE name = ?",
            [company],
            (err, results) => {
                if (err) {
                    console.error("Error checking for unique company name: " + err.message);
                    return res.status(500).json({ error: "Error checking for company name" });
                }

                const count = results[0].count;

                if (count > 0) {
                    updateFields.push("company = ?");
                    updateValues.push(company);
                    siteUrl = count + 1;
                } else {
                    updateFields.push("company = ?");
                    updateValues.push(company);
                }
            }
        );
    }

    if (oldPassword && newPassword) {
        connection.query(
            "SELECT password FROM users WHERE id = ?",
            [decoded.id],
            async (err, results) => {
                if (err) {
                    console.error("Query execution error: " + err.message);
                    return res.status(500).json({ error: "Query execution error" });
                }

                const user = results[0];
                const isMatch = await bcrypt.compare(oldPassword, user.password);

                if (!isMatch) {
                    connection.end();
                    return res.status(401).json({
                        message: "Incorrect old password. Update not performed.",
                    });
                }

                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                updateFields.push("password = ?");
                updateValues.push(hashedNewPassword);

                finalizeUpdate();
            }
        );
    } else {
        finalizeUpdate();
    }

    function finalizeUpdate() {
        if (updateFields.length > 0) {
            const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
            updateValues.push(decoded.id);

            connection.query(query, updateValues, (err) => {
                if (err) {
                    console.error("Error updating data: " + err.message);
                    return res.status(500).json({ error: "Error updating data" });
                }

                if (company) {
                    updateSite(decoded.id, company, siteUrl);
                } else {
                    sendResponse();
                }
            });
        } else {
            res.status(400).json({ message: "No data to update" });
            connection.end();
        }
    }

    function updateSite(userId, newCompany, siteUrl ) {
        const query = "UPDATE sites SET name = ?, url = ? WHERE user_id = ?";

        connection.query(query, [newCompany, siteUrl, userId], (err) => {
            if (err) {
                console.error(
                    "Error updating data in sites table: " + err.message
                );
                return res
                    .status(500)
                    .json({ error: "Error updating data in sites table" });
            }

            sendResponse();
        });
    }

    function sendResponse() {
        const newToken = jwt.sign(
            {
                id: decoded.id,
                email: email || decoded.email,
                name: username || decoded.name,
                company: company || decoded.company,
            },
            dotenv.config().parsed.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(200).json({ message: "Data successfully updated", token: newToken });
        connection.end();
    }
};

export const login = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    connection.connect((err) => {
        if (err) {
            console.error("Database connection error: " + err.stack);
            return res
                .status(500)
                .json({ error: "Database connection error" });
        }

        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error("Query execution error: " + err.message);
                return res.status(500).json({ error: "Query execution error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    company: user.company,
                    reset: user.reset,
                },
                dotenv.config().parsed.JWT_SECRET,
                { expiresIn: "30d" }
            );
            res.json({ message: "Login successful", token });
            connection.end();
        });
    });
};

export const register = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { username, email, password, company, restaurantName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Query to check if a user with the same email, username, or company already exists
        const checkUserQuery =
            "SELECT id FROM users WHERE email = ? OR username = ?";

        connection.connect((err) => {
            if (err) {
                console.error("Database connection error: " + err.stack);
                return res.status(500).json({ error: "Database connection error" });
            }

            connection.query(checkUserQuery, [email, username], (err, results) => {
                if (err) {
                    console.error("Query execution error: " + err.message);
                    return res.status(500).json({ error: "Query execution error" });
                }

                if (results.length > 0) {
                    return res.status(409).json({
                        error:
                            "A user with the same email, username, or company already exists",
                    });
                }

                const insertUserQuery =
                    "INSERT INTO users (username, email, password, company, reset) VALUES (?, ?, ?, ?, ?)";
                const getUserQuery = "SELECT id FROM users WHERE email = ?";

                connection.query(
                    insertUserQuery,
                    [username, email, hashedPassword, company, uuidv4()],
                    (err, results) => {
                        if (err) {
                            console.error("Query execution error: " + err.message);
                            return res.status(500).json({ error: "Query execution error" });
                        }

                        // Retrieve the new user's ID
                        connection.query(getUserQuery, [email], (err, results) => {
                            if (err) {
                                console.error("Query execution error: " + err.message);
                                return res.status(500).json({ error: "Query execution error" });
                            }

                            const user = results[0];

                            // Now, check how many sites this company already has
                            const checkSiteCountQuery =
                                "SELECT COUNT(*) AS siteCount FROM sites WHERE name = ?";

                            connection.query(
                                checkSiteCountQuery,
                                [company],
                                (err, countResults) => {
                                    if (err) {
                                        console.error("Query execution error: " + err.message);
                                        return res
                                            .status(500)
                                            .json({ error: "Query execution error" });
                                    }

                                    const siteCount = countResults[0].siteCount;
                                    const newSiteNumber = siteCount + 1;

                                    createSite(user.id, newSiteNumber, company)
                                        .then(() => {
                                            res
                                                .status(201)
                                                .json({ message: "User successfully registered!" });
                                            connection.end();
                                        })
                                        .catch((error) => {
                                            console.error(
                                                "Error creating landing page: " + error.message
                                            );
                                            res
                                                .status(500)
                                                .json({ error: "Error creating landing page" });
                                            connection.end();
                                        });
                                }
                            );
                        });
                    }
                );
            });
        });
    } catch (error) {
        console.error("Password hashing error: " + error.message);
        res.status(500).json({ error: "Password hashing error" });
    }
};

export const getUser = async (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, dotenv.config().parsed.JWT_SECRET);
    res.status(200).json(decoded);
};

const pool = mysql.createPool(dbConfig);

// Function wrapper for executing queries with promises
function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const resetPassSend = async (req, res) => {
    console.log("email");
    const { email } = req.body;
    console.log(email);

    const connection = mysql.createConnection(dbConfig);

    let subject = "Test";
    let from = "igorbarakudov@gmail.com";
    let text =
        "Dear " +
        email +
        "\n" +
        "\n" +
        "You have received this email because a request to reset the password for your account has been made.\n" +
        "\n" +
        "To reset your password, please click on the following link:\n" +
        "\n";

    let to;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
            user: "igorbarakudov@gmail.com",
            pass: "azwxxhxacgrearib",
        },
    });

    try {
        // Retrieve the current password hash from the database
        connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, results) => {
                if (err) {
                    console.error("Query execution error: " + err.message);
                    return res.status(500).json({ error: "Query execution error" });
                }

                if (results.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }

                const user = results[0];
                console.log(user);
                text += `menualista.com/reset/${user.reset}/${user.email}`;
                to = user.email;

                console.log(text);

                const info = await transporter.sendMail({
                    subject,
                    text,
                    from,
                    to,
                });

                console.log("Message sent: %s", info.messageId);
            }
        );
    } catch (error) {}

    res.status(200).json({
        message: "",
    });
};

export const changePassword = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { newPassword, email, key } = req.body;

    connection.connect(async (err) => {
        if (err) {
            console.error("Database connection error: " + err.stack);
            return res
                .status(500)
                .json({ error: "Database connection error" });
        }

        try {
            // Retrieve the current password hash from the database
            connection.query(
                "SELECT * FROM users WHERE email = ? AND reset = ?",
                [email, key],
                async (err, results) => {
                    if (err) {
                        console.error("Query execution error: " + err.message);
                        return res.status(500).json({ error: "Query execution error" });
                    }

                    if (results.length === 0) {
                        return res.status(404).json({ message: "User not found" });
                    }

                    const user = results[0];

                    console.log(user);

                    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

                    console.log(email, key);

                    // Update the password in the database
                    connection.query(
                        "UPDATE users SET password = ? WHERE email = ? AND reset = ?",
                        [hashedNewPassword, email, key],
                        (err) => {
                            if (err) {
                                console.error("Password update error: " + err.message);
                                return res
                                    .status(500)
                                    .json({ error: "Password update error" });
                            }

                            res.status(200).json({ message: "Password successfully updated" });
                            connection.end();
                        }
                    );
                }
            );
        } catch (error) {
            console.error("Error: " + error.message);
            res.status(500).json({ error: "Internal server error" });
            connection.end();
        }
    });
};
