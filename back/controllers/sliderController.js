import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';

const connection = mysql.createConnection(dbConfig);

export const updateSlider = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;
    const { visible, imagesUrls } = req.body;

    let images = null;

    if (imagesUrls.lenght > 0) {
        images = JSON.parse(imagesUrls);
    } else {
        images = [imagesUrls];
    }

    const query = 'UPDATE sliders SET visible = ?, images = ? WHERE site_id = ?';
    const params = [visible, images ? JSON.stringify(images) : null, siteId];

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error updating slider:', err);
            res.status(500).json({ error: 'Error updating slider' });
            return;
        }

        res.status(200).json({
            message: 'Slider updated successfully',
            updatedFields: {
                visible: visible,
                images: images || null
            }
        });
    });

    connection.end();
};