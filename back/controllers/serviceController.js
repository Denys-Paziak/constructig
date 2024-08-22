import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';

import { uploadFile, uploadFiles } from "../util/uploadFile.js";

const connection = mysql.createConnection(dbConfig);

export const uploadImage = async (req, res) => {
    const image = req.file;
    const url = await uploadFile(image);
    return res.status(200).json({ url });
};

export const createService = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId, type, data } = req.body;

    const query = 'INSERT INTO services (site_id, type, data, visible) VALUES (?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [siteId, type, JSON.stringify(data), true], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Сервіс створено успішно!' });
            connection.end();
        });
    });
};


export const updateService = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { serviceId } = req.params;
    const data = JSON.parse(req.body.data);
    const { visible, cols } = data;


    console.log(serviceId)

    const colsJson = JSON.stringify(cols);

    const query = 'UPDATE services SET visible = ?, cols = ? WHERE site_id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [visible, colsJson, serviceId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Сервіс оновлено успішно!' });
            connection.end();
        });
    });
};

export const createItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { categoryId, name, description, price, image, siteId } = req.body;

    const query = 'INSERT INTO items (category_id, name, description, price, image, site_id) VALUES (?, ?, ?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [categoryId, name, description, price, image, siteId], (err, results) => {
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

export const createNews = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId, title, content, image } = req.body;

    const query = 'INSERT INTO news (site_id, title, content, image, date) VALUES (?, ?, ?, ?, NOW())';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [siteId, title, content, image], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }


            res.status(201).json({ message: 'Новина створена успішно!' });
            connection.end();
        });
    });
};
