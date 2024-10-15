import mysql from "mysql2";
import dbConfig from "../config/dbConfig.js";

const connection = mysql.createConnection(dbConfig);

export const updateSocial = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const data = JSON.parse(req.body.data);
  const { siteId } = req.params;

  const {
    visible,
    instagram,
    facebook,
    youtube,
    messenger,
    whatsApp,
    viber,
    x,
    tikTok,
  } = data;

  let params = [
    visible,
    instagram,
    facebook,
    youtube,
    messenger,
    whatsApp,
    viber,
    x,
    tikTok,
    siteId,
  ];

  const query =
    "UPDATE socials SET visible = ?, instagram = ?, facebook = ?, youtube = ?, messenger = ?, whatsApp = ?, viber = ?, x = ?, tikTok = ? WHERE site_id = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error updating header:", err);
      res.status(500).json({ error: "Error updating social" });
      return;
    }

    res.status(200).json({ message: "Social updated successfully", data });
  });

  connection.end();
};
