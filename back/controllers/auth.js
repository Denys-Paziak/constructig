import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const updateUser = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, dotenv.config().parsed.JWT_SECRET);

  const { username, email, company, oldPassword, newPassword } = req.body;

  let updateFields = [];
  let updateValues = [];

  if (username) {
    updateFields.push("username = ?");
    updateValues.push(username);
  }

  if (email) {
    updateFields.push("email = ?");
    updateValues.push(email);
  }

  if (company) {
    updateFields.push("company = ?");
    updateValues.push(company);
  }

  if (oldPassword && newPassword) {
    connection.query(
      "SELECT password FROM users WHERE id = ?",
      [decoded.id],
      async (err, results) => {
        if (err) {
          console.error("Помилка виконання запиту: " + err.message);
          return res.status(500).json({ error: "Помилка виконання запиту" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
          connection.end();
          return res.status(401).json({
            message: "Невірний старий пароль. Оновлення не виконано.",
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
          console.error("Помилка оновлення даних: " + err.message);
          return res.status(500).json({ error: "Помилка оновлення даних" });
        }

        if (company) {
          updateSite(decoded.id, company);
        } else {
          sendResponse();
        }
      });
    } else {
      res.status(400).json({ message: "Немає даних для оновлення" });
      connection.end();
    }
  }

  function updateSite(userId, newCompany) {
    const query = "UPDATE sites SET url = ?, name = ? WHERE user_id = ?";
    const newUrl = newCompany.toLowerCase().replace(/\s+/g, "-");

    connection.query(query, [newUrl, newCompany, userId], (err) => {
      if (err) {
        console.error(
          "Помилка оновлення даних у таблиці sites: " + err.message
        );
        return res
          .status(500)
          .json({ error: "Помилка оновлення даних у таблиці sites" });
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

    res.status(200).json({ message: "Дані успішно оновлені", token: newToken });
    connection.end();
  }
};

export const login = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  connection.connect((err) => {
    if (err) {
      console.error("Помилка підключення до бази даних: " + err.stack);
      return res
        .status(500)
        .json({ error: "Помилка підключення до бази даних" });
    }

    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Помилка виконання запиту: " + err.message);
        return res.status(500).json({ error: "Помилка виконання запиту" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Невірний email або пароль" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Невірний email або пароль" });
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
      res.json({ message: "Вхід успішний", token });
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

            connection.query(
                checkUserQuery,
                [email, username],
                (err, results) => {
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

                                connection.query(checkSiteCountQuery, [company], (err, countResults) => {
                                    if (err) {
                                        console.error("Query execution error: " + err.message);
                                        return res.status(500).json({ error: "Query execution error" });
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
                                            console.error("Error creating landing page: " + error.message);
                                            res.status(500).json({ error: "Error creating landing page" });
                                            connection.end();
                                        });
                                });
                            });
                        }
                    );
                }
            );
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

async function createSite(id, url, name) {
    return new Promise(async (resolve, reject) => {
        try {
            // Початок транзакції
            await executeQuery("START TRANSACTION");

            // Додавання запису у таблицю sites
            const queryInsertSite = "INSERT INTO sites (user_id, url, name) VALUES (?, ?, ?)";
            const result = await executeQuery(queryInsertSite, [id, url, name]);

            // Перевірка, чи було успішно вставлено запис
            if (!result || !result.insertId) {
                throw new Error("Failed to add site");
            }

            const siteId = result.insertId;

            // Масив із запитами для вставки
            const queries = [
                {
                    query: "INSERT INTO headers (site_id, visible, logo, menu) VALUES (?, ?, ?, ?)",
                    params: [siteId, true, null, JSON.stringify([
                        { link: "#slider", text: "Home" },
                        { link: "#services", text: "Services" },
                        { link: "#about", text: "About Us" },
                        { link: "#contact", text: "Contact Us" },
                    ])],
                },
                {
                    query: "INSERT INTO sliders (site_id, visible, images) VALUES (?, ?, ?)",
                    params: [siteId, true, JSON.stringify([])],
                },
                {
                    query: "INSERT INTO services (site_id, visible, cols) VALUES (?, ?, ?)",
                    params: [siteId, true, JSON.stringify([
                        { image: "", title: "Call", phone: null },
                        { image: "", title: "Geo", link: null },
                        { image: "", title: "Menu" },
                        { image: "", title: "News" },
                    ])],
                },
                {
                    query: "INSERT INTO info (site_id, visible, image, title, text) VALUES (?, ?, ?, ?, ?)",
                    params: [siteId, true, null, "Title", "Lorem Ipsum is simply dummy text of the printing and typesetting industry."],
                },
                {
                    query: "INSERT INTO socials (site_id, visible, instagram, facebook, youtube, messenger, whatsApp, viber, x, tikTok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    params: [siteId, true, "https://instagram.com", "https://facebook.com", null, null, "https://whatsapp.com", null, "https://x.com", null],
                },
                {
                    query: "INSERT INTO footers (site_id, visible, work_time, web_link, first_description, second_description) VALUES (?, ?, ?, ?, ?, ?)",
                    params: [siteId, true, "Mon-Fri 9am-6pm", null, "Lorem ipsum description.", "Another description."],
                },
                {
                    query: "INSERT INTO global (site_id, main_bg_color, main_text_color, site_bg_color, site_text_color) VALUES (?, ?, ?, ?, ?)",
                    params: [
                        siteId,
                        JSON.stringify({ r: 59, g: 130, b: 246, a: 1 }),
                        JSON.stringify({ r: 255, g: 255, b: 255, a: 1 }),
                        JSON.stringify({ r: 255, g: 255, b: 255, a: 1 }),
                        JSON.stringify({ r: 0, g: 0, b: 0, a: 1 }),
                    ],
                },
                {
                    query: "INSERT INTO banner (site_id, visible) VALUES (?, ?)",
                    params: [siteId, false],
                },
            ];

            // Виконання запитів
            for (const { query, params } of queries) {
                const queryResult = await executeQuery(query, params);

                // Перевірка, чи запит був виконаний успішно
                if (!queryResult) {
                    throw new Error(`Failed to execute query: ${query}`);
                }
            }

            // Коміт транзакції
            await executeQuery("COMMIT");

            resolve({ success: true, siteId });
        } catch (error) {
            console.error("Error executing queries: ", error.message);
            try {
                await executeQuery("ROLLBACK");
            } catch (rollbackError) {
                console.error("Error during rollback: ", rollbackError.message);
            }
            reject(new Error(`Error executing queries: ${error.message}`));
        }
    });
}

// Функція обгортка для виконання запиту з промісами
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
    // Отримуємо поточний хеш пароля з бази даних
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Помилка виконання запиту: " + err.message);
          return res.status(500).json({ error: "Помилка виконання запиту" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Користувача не знайдено" });
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
      console.error("Помилка підключення до бази даних: " + err.stack);
      return res
        .status(500)
        .json({ error: "Помилка підключення до бази даних" });
    }

    try {
      // Отримуємо поточний хеш пароля з бази даних
      connection.query(
        "SELECT * FROM users WHERE email = ? AND reset = ?",
        [email, key],
        async (err, results) => {
          if (err) {
            console.error("Помилка виконання запиту: " + err.message);
            return res.status(500).json({ error: "Помилка виконання запиту" });
          }

          if (results.length === 0) {
            return res.status(404).json({ message: "Користувача не знайдено" });
          }

          const user = results[0];

          console.log(user);

          const hashedNewPassword = await bcrypt.hash(newPassword, 10);

          console.log(email, key);

          // Оновлюємо пароль в базі даних
          connection.query(
            "UPDATE users SET password = ? WHERE email = ? AND reset = ?",
            [hashedNewPassword, email, key],
            (err) => {
              if (err) {
                console.error("Помилка оновлення пароля: " + err.message);
                return res
                  .status(500)
                  .json({ error: "Помилка оновлення пароля" });
              }

              res.status(200).json({ message: "Пароль успішно змінено" });
              connection.end();
            }
          );
        }
      );
    } catch (error) {
      console.error("Помилка: " + error.message);
      res.status(500).json({ error: "Внутрішня помилка сервера" });
      connection.end();
    }
  });
};
