
import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';
import { uploadImageServer } from "./upload.js";


export const createNews = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;

    const image = req.file;
    const resUpload = await uploadImageServer(image);

    const { title, content, date } = req.body;

    const query = 'INSERT INTO news (title, content, date, image, site_id) VALUES (?, ?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [title, content, date, resUpload, siteId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Товар створено успішно!' });
            connection.end();
        });
    });
};

export const deleteNews = (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { newsId } = req.params;

    const query = 'DELETE FROM news WHERE id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [newsId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Новину успішно видалено!' });
            connection.end();
        });
    });
};

export const updateNews = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { newsId } = req.params;
    const { title, content, date } = req.body;

    let query = "UPDATE news SET title = ?, content = ?, date = ?";
    let params = [title, content, date];

    if (req.file) {
        const resUpload = await uploadImageServer(req.file);
        query += ", image = ?";
        params.push(resUpload);
    }

    query += " WHERE id = ?";
    params.push(newsId);

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
                return res.status(404).json({ error: 'Новину не знайдено' });
            }

            res.status(200).json({ message: 'Новину успішно оновлено!' });
            connection.end();
        });
    });
};


export const getNewsById = (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { newsId } = req.params;

    const query = 'SELECT * FROM news WHERE id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [newsId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Новину не знайдено' });
            }

            res.status(200).json(results[0]);
            connection.end();
        });
    });
};

