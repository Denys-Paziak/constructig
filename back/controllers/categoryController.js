import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import { uploadImageServer } from "./upload.js";

const connection = mysql.createConnection(dbConfig);

export const createCategory = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const data = JSON.parse(req.body.data);
    const { siteId } = req.params;
    const { name } = data;


    const image = req.body.image;
    const resUpload = await uploadImageServer(image);

    let params = [name, resUpload.url, siteId];

    const query = "INSERT INTO categories (name, image) VALUES (?, ?, ?) WHERE site_id = ?";

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
