import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import { uploadImageServer } from "./upload.js";


export const createCategory = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { name } = req.body;
    const { siteId } = req.params;

    const image = req.file;
    const resUpload = await uploadImageServer(image);

    let params = [name, resUpload, siteId];

    const query =
        "INSERT INTO categories (name, image, site_id) VALUES (?, ?, ?)";

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
