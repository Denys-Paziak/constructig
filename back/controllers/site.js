import mysql from "mysql";
import dbConfig from '../config/dbConfig.js';

import { uploadFile, uploadFiles } from "../util/uploadFile.js";

const connection = mysql.createConnection(dbConfig);

export const createSite = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { id } = req.user;
    const { url, name } = req.body;

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        // Перевірка на унікальність URL
        const queryCheckUrl = 'SELECT id FROM sites WHERE url = ?';
        connection.query(queryCheckUrl, [url], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'URL вже існує. Виберіть інший URL.' });
            }

            connection.beginTransaction(err => {
                if (err) {
                    console.error('Помилка початку транзакції: ' + err.stack);
                    return res.status(500).json({ error: 'Помилка початку транзакції' });
                }

                const queryInsertSite = 'INSERT INTO sites (user_id, url, name) VALUES (?, ?, ?)';

                connection.query(queryInsertSite, [id, url, name], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Помилка виконання запиту: ' + err.message);
                            res.status(500).json({ error: 'Помилка виконання запиту' });
                        });
                    }

                    const siteId = results.insertId;

                    // Використовуємо послідовні запити замість пакетного запиту
                    const queryInsertHeader = 'INSERT INTO headers (site_id, visible, logo, menu) VALUES (?, ?, ?, ?)';
                    const queryInsertSlider = 'INSERT INTO sliders (site_id, visible, images) VALUES (?, ?, ?)';
                    const queryInsertServices = 'INSERT INTO services (site_id, visible, cols) VALUES (?, ?, ?)';
                    const queryInsertInfo = 'INSERT INTO info (site_id, visible, image, title, text) VALUES (?, ?, ?, ?, ?)';
                    const queryInsertSocials = 'INSERT INTO socials (site_id, visible, instagram, facebook, youtube) VALUES (?, ?, ?, ?, ?)';
                    const queryInsertFooter = 'INSERT INTO footers (site_id, visible, work_time, web_link) VALUES (?, ?, ?, ?)';

                    const defaultMenu = JSON.stringify([
                        { "link": "/home", "text": "Home" },
                        { "link": "/about", "text": "About Us" }
                    ]);

                    const defaultCols = JSON.stringify([
                        { "image": "default_service.jpg", "title": "Service 1" },
                        { "image": "default_service.jpg", "title": "Service 2" },
                        { "image": "default_service.jpg", "title": "Service 3" }
                    ]);

                    connection.query(queryInsertHeader, [siteId, true, null, defaultMenu], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Помилка вставки в таблицю headers: ' + err.message);
                                res.status(500).json({ error: 'Помилка вставки в таблицю headers' });
                            });
                        }

                        connection.query(queryInsertSlider, [siteId, true, JSON.stringify([])], (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.error('Помилка вставки в таблицю sliders: ' + err.message);
                                    res.status(500).json({ error: 'Помилка вставки в таблицю sliders' });
                                });
                            }

                            connection.query(queryInsertServices, [siteId, true, defaultCols], (err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        console.error('Помилка вставки в таблицю services: ' + err.message);
                                        res.status(500).json({ error: 'Помилка вставки в таблицю services' });
                                    });
                                }

                                connection.query(queryInsertInfo, [siteId, true, null, "Default Title", "Default text"], (err) => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            console.error('Помилка вставки в таблицю info: ' + err.message);
                                            res.status(500).json({ error: 'Помилка вставки в таблицю info' });
                                        });
                                    }

                                    connection.query(queryInsertSocials, [siteId, true, null, null, null], (err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                console.error('Помилка вставки в таблицю socials: ' + err.message);
                                                res.status(500).json({ error: 'Помилка вставки в таблицю socials' });
                                            });
                                        }

                                        connection.query(queryInsertFooter, [siteId, true, "Mon-Fri 9am-6pm", null], (err) => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    console.error('Помилка вставки в таблицю footers: ' + err.message);
                                                    res.status(500).json({ error: 'Помилка вставки в таблицю footers' });
                                                });
                                            }

                                            connection.commit(err => {
                                                if (err) {
                                                    return connection.rollback(() => {
                                                        console.error('Помилка коміту транзакції: ' + err.message);
                                                        res.status(500).json({ error: 'Помилка коміту транзакції' });
                                                    });
                                                }

                                                res.status(201).json({ message: 'Лендінг створено успішно!' });
                                                connection.end();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

export const getSite = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;

    const query = `
        SELECT 
            s.id AS site_id, s.url AS site_url, s.name AS site_name,
            h.visible AS header_visible, h.logo AS header_logo, h.menu AS header_menu,
            sl.visible AS slider_visible, sl.images AS slider_images,
            se.visible AS services_visible, se.cols AS services_cols,
            i.visible AS info_visible, i.image AS info_image, i.title AS info_title, i.text AS info_text,
            so.visible AS socials_visible, so.instagram AS socials_instagram, so.facebook AS socials_facebook, so.youtube AS socials_youtube,
            f.visible AS footer_visible, f.work_time AS footer_work_time, f.web_link AS footer_web_link
        FROM sites s
        LEFT JOIN headers h ON s.id = h.site_id
        LEFT JOIN sliders sl ON s.id = sl.site_id
        LEFT JOIN services se ON s.id = se.site_id
        LEFT JOIN info i ON s.id = i.site_id
        LEFT JOIN socials so ON s.id = so.site_id
        LEFT JOIN footers f ON s.id = f.site_id
        WHERE s.id = ? AND s.user_id = ?
    `;

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [siteId, req.user.id], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Лендінг не знайдено' });
            }

            const result = results[0];


            const site = {
                id: result.site_id,
                url: result.site_url,
                name: result.site_name
            };

            const header = {
                visible: result.header_visible,
                logo: result.header_logo,
                menu: JSON.parse(result.header_menu)
            };

            const slider = {
                visible: result.slider_visible,
                images: JSON.parse(result.slider_images)
            };

            const services = {
                visible: result.services_visible,
                cols: JSON.parse(result.services_cols)
            };

            const info = {
                visible: result.info_visible,
                image: result.info_image,
                title: result.info_title,
                text: result.info_text
            };

            const socials = {
                visible: result.socials_visible,
                instagram: result.socials_instagram,
                facebook: result.socials_facebook,
                youtube: result.socials_youtube
            };

            const footer = {
                visible: result.footer_visible,
                work_time: result.footer_work_time,
                web_link: result.footer_web_link
            };

            console.log(result)

            res.status(200).json({
                site,
                header,
                slider,
                services,
                info,
                socials,
                footer,
            });

            connection.end();
        });
    });
};


export const updateSite = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;
    const data = JSON.parse(req.body.data);

    const { header, slider, services, info, socials, footer } = data;

    const headerLogo = req.files.logo;

    connection.beginTransaction(err => {
        if (err) {
            console.error('Помилка початку транзакції: ' + err.stack);
            return res.status(500).json({ error: 'Помилка початку транзакції' });
        }

        const imageLocation = uploadFile(headerLogo[0]);


        const queries = [
            {
                query: 'UPDATE headers SET visible = ?, logo = ?, menu = ? WHERE site_id = ?',
                params: [header.visible, imageLocation, JSON.stringify(header.menu), siteId]
            },
            {
                query: 'UPDATE sliders SET visible = ?, images = ? WHERE site_id = ?',
                params: [slider.visible, JSON.stringify(slider.images), siteId]
            },
            {
                query: 'UPDATE services SET visible = ?, cols = ? WHERE site_id = ?',
                params: [services.visible, JSON.stringify(services.cols), siteId]
            },
            {
                query: 'UPDATE info SET visible = ?, image = ?, title = ?, text = ? WHERE site_id = ?',
                params: [info.visible, info.image, info.title, info.text, siteId]
            },
            {
                query: 'UPDATE socials SET visible = ?, instagram = ?, facebook = ?, youtube = ? WHERE site_id = ?',
                params: [socials.visible, socials.instagram, socials.facebook, socials.youtube, siteId]
            },
            {
                query: 'UPDATE footers SET visible = ?, work_time = ?, web_link = ? WHERE site_id = ?',
                params: [footer.visible, footer.work_time, footer.web_link, siteId]
            }
        ];

        queries.forEach((q, index) => {
            connection.query(q.query, q.params, (err) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Помилка оновлення лендінгу: ' + err.message);
                        return res.status(500).json({ error: 'Помилка оновлення лендінгу' });
                    });
                }

                // Перевіряємо, чи це останній запит
                if (index === queries.length - 1) {
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Помилка коміту транзакції: ' + err.message);
                                return res.status(500).json({ error: 'Помилка коміту транзакції' });
                            });
                        }

                        res.status(200).json({ message: 'Лендінг оновлено успішно!' });
                        connection.end();
                    });
                }
            });
        });
    });
};


export const updateHeader = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    const data = JSON.parse(req.body.data);

    const { siteId } = req.params;
    const { visible, menu } = data;
    const headerLogo = req.files.logo;

    let params = [];

    if (headerLogo) {
        const imageLocation = await uploadFile(headerLogo[0]);
        params = [visible, imageLocation, JSON.stringify(menu), siteId];
    } else {
        params = [visible, null, JSON.stringify(menu), siteId];
    }

    const query = 'UPDATE headers SET visible = ?, logo = ?, menu = ? WHERE site_id = ?';


    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error updating header:', err);
            res.status(500).json({ error: 'Error updating header' });
            return;
        }

        res.status(200).json({ message: 'Header updated successfully', location: imageLocation });
    });

    connection.end();
};

export const updateSlider = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId } = req.params;
    const { visible } = req.body;

    let images = null;  // Значення за замовчуванням, якщо файлів немає

    if (req.files && req.files.slides) {
        const slides = req.files.slides;
        images = await uploadFiles(slides);
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


export const deleteSite = async (req, res) => {
    const { siteId } = req.params;

    try {
        await pool.query('DELETE FROM sites WHERE id = ? AND user_id = ?', [siteId, req.user.userId]);
        res.status(200).json({ message: 'Лендінг видалено успішно!' });
    } catch (error) {
        console.error('Помилка видалення лендінгу: ' + error.message);
        res.status(500).json({ error: 'Помилка видалення лендінгу' });
    }
};

export const getUserSites = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        const query = 'SELECT * FROM sites WHERE user_id = ?';

        connection.query(query, [req.user.id], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Лендінги не знайдено' });
            }

            res.status(200).json({ sites: results });

            connection.end();
        });
    });
};

export const createService = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId, type, data } = req.body;

    const query = 'INSERT INTO services (site_id, type, data, visible) VALUES (?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [siteId, type, JSON.stringify(data), true], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Сервіс створено успішно!' });
            connection.end();
        });
    });
};

export const updateService = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { serviceId } = req.params;
    const { data } = req.body;

    const query = 'UPDATE services SET data = ? WHERE id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [JSON.stringify(data), serviceId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Сервіс оновлено успішно!' });
            connection.end();
        });
    });
};

export const createItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { categoryId, name, description, price, image, siteId } = req.body;

    const query = 'INSERT INTO items (category_id, name, description, price, image, site_id) VALUES (?, ?, ?, ?, ?, ?)';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [categoryId, name, description, price, image, siteId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Товар створено успішно!' });
            connection.end();
        });
    });
};

export const updateItem = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { itemId } = req.params;
    const { name, description, price, image } = req.body;

    const query = 'UPDATE items SET name = ?, description = ?, price = ?, image = ? WHERE id = ?';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [name, description, price, image, itemId], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(200).json({ message: 'Товар оновлено успішно!' });
            connection.end();
        });
    });
};

export const createNews = async (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const { siteId, title, content, image } = req.body;

    const query = 'INSERT INTO news (site_id, title, content, image, date) VALUES (?, ?, ?, ?, NOW())';

    connection.connect(err => {
        if (err) {
            console.error('Помилка підключення до бази даних: ' + err.stack);
            return res.status(500).json({ error: 'Помилка підключення до бази даних' });
        }

        connection.query(query, [siteId, title, content, image], (err, results) => {
            if (err) {
                console.error('Помилка виконання запиту: ' + err.message);
                return res.status(500).json({ error: 'Помилка виконання запиту' });
            }

            res.status(201).json({ message: 'Новина створена успішно!' });
            connection.end();
        });
    });
};
