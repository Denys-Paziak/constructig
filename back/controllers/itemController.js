import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';
import { uploadImageServer } from "./upload.js";

export const createItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;


    const { categoryId, name, description, price, isPopular } = req.body;

    let popular;

    if (isPopular === "true") {
        popular = 1
    }else {
        popular = 0
    }


    let query = 'INSERT INTO items (isPopular,category_id, name, description, price, site_id) VALUES ( ?, ?, ?, ?, ?,?)';
    let params = [popular,categoryId, name, description, price, siteId]

    if (req.file) {
        const image = req.file;
        const resUpload = await uploadImageServer(image);
        query = 'INSERT INTO items (isPopular, category_id, name, description, price, image, site_id) VALUES (?, ?, ?, ?, ?, ?,?)';
        params = [popular, categoryId, name, description, price, resUpload, siteId];
    }


    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Товар створено успішно!' });
            connection.end();
        });
    });
};

export const deleteItem = (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { itemId } = req.params;

    const query = "DELETE FROM items WHERE id = ?";

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [itemId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Товар видалено успішно!' });
            connection.end();
        });
    });
};
export const updateItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { itemId } = req.params;
    const { name, description, price } = req.body;

    let query = "UPDATE items SET name = ?, description = ?, price = ?";
    let params = [name, description, price];

    if (req.file) {
        const resUpload = await uploadImageServer(req.file);
        query += ", image = ?";
        params.push(resUpload);
    }

    query += " WHERE id = ?";
    params.push(itemId);

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Товар не знайдено' });
            }

            res.status(200).json({ message: 'Товар оновлено успішно!' });
            connection.end();
        });
    });
};


export const getItemById = (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const { itemId } = req.params;

    const query = "SELECT * FROM items WHERE id = ? ORDER BY isPopular DESC";

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [itemId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Товар не знайдено' });
            }

            res.status(200).json(results[0]);
            connection.end();
        });
    });
};
