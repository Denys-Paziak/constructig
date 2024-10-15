import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";

const connection = mysql.createConnection(dbConfig);

export const updateInfo = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);
  const { siteId } = req.params;

  const { image, text, title, visible } = data;

  let params = [visible, image, text, title, siteId];

  const query =
    "UPDATE info SET visible = ?, image = ?, text = ?, title = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating header:", err);
      res.status(500).json({ error: "Error updating header" });
      return;
    }

    res.status(200).json({ message: "Info updated successfully", data });
  });

  connection.end();
};
