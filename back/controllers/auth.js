import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

export const login = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  connection.connect((err) => {
    if (err) {
      console.error("Помилка підключення до бази даних: " + err.stack);
      return res
        .status(500)
        .json({ error: "Помилка підключення до бази даних" });
    }

    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Помилка виконання запиту: " + err.message);
        return res.status(500).json({ error: "Помилка виконання запиту" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Невірний email або пароль" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Невірний email або пароль" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.username,
          company: user.company,
        },
        dotenv.config().parsed.JWT_SECRET,
        { expiresIn: "30d" }
      );
      res.json({ message: "Вхід успішний", token });
      connection.end();
    });
  });
};

export const register = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { username, email, password, company } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = "INSERT INTO users (username, email, password, company) VALUES (?, ?, ?, ?)";
    const getUserQuery = "SELECT id FROM users WHERE email = ?";

    connection.connect((err) => {
      if (err) {
        console.error("Помилка підключення до бази даних: " + err.stack);
        return res.status(500).json({ error: "Помилка підключення до бази даних" });
      }

      // Insert the new user
      connection.query(insertUserQuery, [username, email, hashedPassword, company], (err, results) => {
        if (err) {
          console.error("Помилка виконання запиту: " + err.message);
          return res.status(500).json({ error: "Помилка виконання запиту" });
        }

        // Retrieve the new user's ID
        connection.query(getUserQuery, [email], (err, results) => {
          if (err) {
            console.error("Помилка виконання запиту: " + err.message);
            return res.status(500).json({ error: "Помилка виконання запиту" });
          }

          const user = results[0];
          createSite(user.id, company, company)
            .then(() => {
              res.status(201).json({ message: "Користувача успішно зареєстровано!" });
              connection.end();
            })
            .catch(error => {
              console.error("Помилка створення лендінгу: " + error.message);
              res.status(500).json({ error: "Помилка створення лендінгу" });
              connection.end();
            });
        });
      });
    });
  } catch (error) {
    console.error("Помилка хешування паролю: " + error.message);
    res.status(500).json({ error: "Помилка хешування паролю" });
  }
};


export const getUser = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, dotenv.config().parsed.JWT_SECRET);
  res.status(200).json(decoded);
};

async function createSite(id, url, name) {
  const connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.error('Помилка підключення до бази даних: ' + err.stack);
      return { error: 'Помилка підключення до бази даних' };
    }

    const queryCheckUrl = 'SELECT id FROM sites WHERE url = ?';
    connection.query(queryCheckUrl, [url], (err, results) => {
      if (err) {
        console.error('Помилка виконання запиту: ' + err.message);
        return { error: 'Помилка виконання запиту' };
      }

      if (results.length > 0) {
        return { error: 'URL вже існує. Виберіть інший URL.' };
      }

      connection.beginTransaction(err => {
        if (err) {
          console.error('Помилка початку транзакції: ' + err.stack);
          return { error: 'Помилка початку транзакції' };
        }

        const queryInsertSite = 'INSERT INTO sites (user_id, url, name) VALUES (?, ?, ?)';

        connection.query(queryInsertSite, [id, url, name], (err, results) => {
          if (err) {
            return connection.rollback(() => {
              console.error('Помилка виконання запиту: ' + err.message);
            });
          }

          const siteId = results.insertId;

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
              });
            }

            connection.query(queryInsertSlider, [siteId, true, JSON.stringify([])], (err) => {
              if (err) {
                return connection.rollback(() => {
                  console.error('Помилка вставки в таблицю sliders: ' + err.message);
                });
              }

              connection.query(queryInsertServices, [siteId, true, defaultCols], (err) => {
                if (err) {
                  return connection.rollback(() => {
                    console.error('Помилка вставки в таблицю services: ' + err.message);
                  });
                }

                connection.query(queryInsertInfo, [siteId, true, null, "Default Title", "Default text"], (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      console.error('Помилка вставки в таблицю info: ' + err.message);
                    });
                  }

                  connection.query(queryInsertSocials, [siteId, true, null, null, null], (err) => {
                    if (err) {
                      return connection.rollback(() => {
                        console.error('Помилка вставки в таблицю socials: ' + err.message);
                      });
                    }

                    connection.query(queryInsertFooter, [siteId, true, "Mon-Fri 9am-6pm", null], (err) => {
                      if (err) {
                        return connection.rollback(() => {
                          console.error('Помилка вставки в таблицю footers: ' + err.message);
                        });
                      }

                      connection.commit(err => {
                        if (err) {
                          return connection.rollback(() => {
                            console.error('Помилка коміту транзакції: ' + err.message);
                          });
                        }

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
}
