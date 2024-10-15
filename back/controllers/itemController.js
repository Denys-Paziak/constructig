import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";
import { uploadImageServer } from "./upload.js";

export const createItem = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { siteId } = req.params;

  const { categoryId, name, description, price, isPopular } = req.body;

  let popular;

  if (isPopular === "true") {
    popular = 1;
  } else {
    popular = 0;
  }

  let query =
    "INSERT INTO items (isPopular, category_id, name, description, price, site_id) VALUES ( ?, ?, ?, ?, ?, ?)";
  let params = [popular, categoryId, name, description, price, siteId];

  if (req.file) {
    const image = req.file;
    const resUpload = await uploadImageServer(image);
    query =
      "INSERT INTO items (isPopular, category_id, name, description, price, image, site_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    params = [popular, categoryId, name, description, price, resUpload, siteId];
  }

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      res.status(201).json({ message: "Item created successfully!" });
      connection.end();
    });
  });
};

export const deleteItem = (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { itemId } = req.params;

  const query = "DELETE FROM items WHERE id = ?";

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(query, [itemId], (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      res.status(200).json({ message: "Item deleted successfully!" });
      connection.end();
    });
  });
};

export const updateItem = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { itemId } = req.params;
  const { name, description, price, isPopular } = req.body;

  console.log("asfso");
  console.log(isPopular);

  let query =
    "UPDATE items SET name = ?, description = ?, price = ?, isPopular = ?";
  let params = [name, description, price, isPopular];

  if (req.file) {
    const resUpload = await uploadImageServer(req.file);
    query += ", image = ?";
    params.push(resUpload);
  }

  query += " WHERE id = ?";
  params.push(itemId);

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(query, params, (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({ message: "Item updated successfully!" });
      connection.end();
    });
  });
};

export const getItemById = (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { itemId } = req.params;

  const query = "SELECT * FROM items WHERE id = ? ORDER BY isPopular DESC";

  connection.connect((err) => {
    if (err) {
      console.error("Database connection error: " + err.stack);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(query, [itemId], (err, results) => {
      if (err) {
        console.error("Query execution error: " + err.message);
        return res.status(500).json({ error: "Query execution error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json(results[0]);
      connection.end();
    });
  });
};
