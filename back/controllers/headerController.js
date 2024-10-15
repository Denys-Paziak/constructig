import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";

const connection = mysql.createConnection(dbConfig);

export const updateHeader = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);

  const { siteId } = req.params;
  const { visible, menu, logo } = data;

  let params = [visible, logo, JSON.stringify(menu), siteId];

  const query =
    "UPDATE headers SET visible = ?, logo = ?, menu = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating header:", err);
      res.status(500).json({ error: "Error updating header" });
      return;
    }

    res.status(200).json({ message: "Header updated successfully", url: logo });
  });

  connection.end();
};
