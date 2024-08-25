import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';

import { uploadFile } from "../util/uploadFile.js";

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
