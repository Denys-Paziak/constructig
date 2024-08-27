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

export const deleteCategory = (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { categoryId } = req.params;

    const query = "DELETE FROM categories WHERE id = ?";

    connection.query(query, [categoryId], (err, results) => {
        if (err) {
            console.error("Error deleting category", err);
            res.status(500).json({ error: "Error deleting category" });
            return;
        }

        res.status(200).json({ message: "Category deleted successfully" });
    });

    connection.end();
};

export const updateCategory = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { categoryId } = req.params;
    const { name } = req.body;
    const image = req.file;

    let query = "UPDATE categories SET name = ?";
    let params = [name];

    if (image) {
        const resUpload = await uploadImageServer(image);
        query += ", image = ?";
        params.push(resUpload);
    }

    query += " WHERE id = ?";
    params.push(categoryId);

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error updating category", err);
            res.status(500).json({ error: "Error updating category" });
            return;
        }

        res.status(200).json({ message: "Category updated successfully" });
    });

    connection.end();
};
