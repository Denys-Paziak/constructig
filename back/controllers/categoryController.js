import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import { uploadImageServer } from "./upload.js";

const connection = mysql.createConnection(dbConfig);

export const createCategory = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { name } = req.body;
  console.log(name);
  console.log(req.file);
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
