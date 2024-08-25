import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';
import { uploadImageServer } from "./upload.js";


export const createItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;

    const image = req.file;
    const resUpload = await uploadImageServer(image);

    const { categoryId, name, description, price } = req.body;

    const query = 'INSERT INTO items (category_id, name, description, price, image, site_id) VALUES (?, ?, ?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [categoryId, name, description, price, resUpload, siteId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Товар створено успішно!' });
            connection.end();
        });
    });
};

export const updateItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { itemId } = req.params;
    const { name, description, price, image } = req.body;

    const query = 'UPDATE items SET name = ?, description = ?, price = ?, image = ? WHERE id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [name, description, price, image, itemId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Товар оновлено успішно!' });
            connection.end();
        });
    });
};