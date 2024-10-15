import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

const connection = mysql.createConnection(dbConfig);

export const updateFooter = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);
  const { siteId } = req.params;

  const { web_link, first_description, second_description, visible, start_time, end_time} = data;

  let params = [end_time, start_time, visible, web_link, first_description, second_description, siteId];

  const query =
    "UPDATE footers SET end_time = ?, start_time = ?, visible = ?, web_link = ?, first_description = ?, second_description = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating header:", err);
      res.status(500).json({ error: "Error updating footer" });
      return;
    }

    res.status(200).json({ message: "Footer updated successfully", data });
  });

  connection.end();
};
