import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

export const updateGlobal = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);

  const { siteId } = req.params;
  const { main_bg_color, main_text_color, site_bg_color, site_text_color } =
    data;

  console.log(main_bg_color, main_text_color, site_bg_color, site_text_color);

  let params = [
    JSON.stringify(main_bg_color),
    JSON.stringify(main_text_color),
    JSON.stringify(site_bg_color),
    JSON.stringify(site_text_color),
    siteId,
  ];

  const query =
    "UPDATE global SET  main_bg_color = ?, main_text_color = ?, site_bg_color = ?, site_text_color = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating global:", err);
      res.status(500).json({ error: "Error updating global" });
      return;
    }

    res.status(200).json({ message: "Global updated successfully" });
  });

  connection.end();
};
