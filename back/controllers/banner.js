import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

export const updateBanner = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);
  const { siteId } = req.params;

  console.log(siteId);

  const { visible } = data;

  let params = [visible, siteId];

  const query = "UPDATE banner SET visible = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating banner:", err);
      res.status(500).json({ error: "Error updating banner" });
      return;
    }

    res.status(200).json({ message: "Banner updated successfully", data });
  });

  connection.end();
};
