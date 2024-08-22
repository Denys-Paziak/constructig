import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

export const updateGlobal = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const data = JSON.parse(req.body.data);

    const { siteId } = req.params;
    const { bg_color, main_text_color, main_color } = data;

    let params = [JSON.stringify(bg_color), JSON.stringify(main_text_color), JSON.stringify(main_color), siteId];

    const query =
        "UPDATE global SET  bg_color = ?, main_text_color = ?, main_color = ? WHERE site_id = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error updating global:", err);
            res.status(500).json({ error: "Error updating global" });
            return;
        }

        res.status(200).json({ message: "Global updated successfully", url: logo });
    });

    connection.end();
};
