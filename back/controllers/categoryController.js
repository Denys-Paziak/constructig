import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

const connection = mysql.createConnection(dbConfig);

export const createCategory = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const data = JSON.parse(req.body.data);
    const { siteId } = req.params;
    const { name, image_url } = data;

    let params = [name, image_url, siteId];

    const query = "INSERT INTO categories (name, image_url) VALUES (?, ?, ?) WHERE site_id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error create category", err);
            res.status(500).json({ error: "Error create category" });
            return;
        }

        res.status(200).json({ message: "Category updated successfully" });
    });

    connection.end();
};
