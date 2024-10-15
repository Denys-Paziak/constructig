import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";
import { uploadImageServer } from "./upload.js";

export const createNews = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { siteId } = req.params;

  const { title, content, date } = req.body;

  let query =
      "INSERT INTO news (title, content, date, site_id) VALUES (?, ?, ?, ?)";
  let params = [title, content, date, siteId];

  if (req.file) {
    const image = req.file;
    const resUpload = await uploadImageServer(image);
    query =
        "INSERT INTO news (title, content, date, image, site_id) VALUES (?, ?, ?, ?, ?)";
    params = [title, content, date, resUpload, siteId];
  }

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res
          .status(500)
          .json({ error: "Database connection error" });
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      res.status(201).json({ message: "The event was created successfully!" });
      connection.end();
    });
  });
};

export const deleteNews = (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { newsId } = req.params;

  const query = "DELETE FROM news WHERE id = ?";

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res
          .status(500)
          .json({ error: "Database connection error" });
    }

    connection.query(query, [newsId], (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      res.status(200).json({ message: "The event successfully deleted!" });
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

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res
          .status(500)
          .json({ error: "Database connection error" });
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "The event not found." });
      }

      res.status(200).json({ message: "The event successfully updated" });
      connection.end();
    });
  });
};

export const getNewsById = (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { newsId } = req.params;

  const query = "SELECT * FROM news WHERE id = ?";

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res
          .status(500)
          .json({ error: "Database connection error" });
    }

    connection.query(query, [newsId], (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "The event not found." });
      }

      res.status(200).json(results[0]);
      connection.end();
    });
  });
};
