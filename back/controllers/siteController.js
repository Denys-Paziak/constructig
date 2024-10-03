import { uploadFile } from "../util/uploadFile.js";
import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";
import {stat} from "fs";

// Створюємо пул з'єднань
const pool = mysql.createPool(dbConfig);

// Функція обгортка для виконання запитів з промісами
function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

// Винесення спільних SQL-запитів у функції
function getSiteQuery() {
  return `
    SELECT 
      s.id AS site_id, s.url AS site_url, s.name AS site_name, s.lang AS site_lang, s.langId AS site_langId, 
      h.visible AS header_visible, h.logo AS header_logo, h.menu AS header_menu,
      sl.visible AS slider_visible, sl.images AS slider_images,
      se.visible AS services_visible, se.cols AS services_cols,
      i.visible AS info_visible, i.image AS info_image, i.title AS info_title, i.text AS info_text,
      so.visible AS socials_visible, so.instagram AS socials_instagram, so.facebook AS socials_facebook, so.youtube AS socials_youtube, so.messenger AS socials_messenger, so.whatsApp AS socials_whatsApp, so.viber AS socials_viber, so.x AS socials_x, so.tikTok AS socials_tikTok,
      f.visible AS footer_visible, f.work_time AS footer_work_time, f.web_link AS footer_web_link, f.first_description AS footer_first_description, f.second_description AS footer_second_description, f.end_time AS footer_end_time, f.start_time AS footer_start_time,
      b.visible AS banner_visible,
      g.main_bg_color AS global_main_bg_color, g.main_text_color AS global_main_text_color,
      g.site_bg_color AS global_site_bg_color, g.site_text_color AS global_site_text_color
    FROM sites s
    LEFT JOIN headers h ON s.id = h.site_id
    LEFT JOIN sliders sl ON s.id = sl.site_id
    LEFT JOIN services se ON s.id = se.site_id
    LEFT JOIN info i ON s.id = i.site_id
    LEFT JOIN socials so ON s.id = so.site_id
    LEFT JOIN footers f ON s.id = f.site_id
    LEFT JOIN banner b ON s.id = b.site_id
    LEFT JOIN global g ON s.id = g.site_id
  `;
}

function getCategoriesQuery() {
  return "SELECT * FROM categories WHERE site_id = ?";
}

function getItemsQuery() {
  return `
    SELECT i.id, i.isPopular, i.name, i.description, i.price, i.image, c.name AS category_name
    FROM items i
    LEFT JOIN categories c ON i.category_id = c.id
    WHERE i.site_id = ?`;
}

function getNewsQuery() {
  return "SELECT * FROM news WHERE site_id = ?";
}

// Функція для побудови об'єкта відповіді
function buildSiteResponse(result, categoriesResult, itemsResult, newsResult) {
  return {
    site: {
      id: result.site_id,
      url: result.site_url,
      name: result.site_name,
      lang: result.site_lang,
      langId: result.site_langId
    },
    header: {
      visible: result.header_visible,
      logo: result.header_logo,
      menu: JSON.parse(result.header_menu),
    },
    slider: {
      visible: result.slider_visible,
      images: JSON.parse(result.slider_images),
    },
    services: {
      visible: result.services_visible,
      cols: JSON.parse(result.services_cols),
    },
    info: {
      visible: result.info_visible,
      image: result.info_image,
      title: result.info_title,
      text: result.info_text,
    },
    socials: {
      visible: result.socials_visible,
      instagram: result.socials_instagram,
      facebook: result.socials_facebook,
      youtube: result.socials_youtube,
      messenger: result.socials_messenger,
      whatsApp: result.socials_whatsApp,
      viber: result.socials_viber,
      x: result.socials_x,
      tikTok: result.socials_tikTok,
    },
    footer: {
      visible: result.footer_visible,
      work_time: result.footer_work_time,
      web_link: result.footer_web_link,
      first_description: result.footer_first_description,
      second_description: result.footer_second_description,
      start_time: result.footer_start_time,
      end_time: result.footer_end_time,
    },
    banner: {
      visible: result.banner_visible,
    },
    global: {
      main_bg_color: JSON.parse(result.global_main_bg_color),
      main_text_color: JSON.parse(result.global_main_text_color),
      site_bg_color: JSON.parse(result.global_site_bg_color),
      site_text_color: JSON.parse(result.global_site_text_color),
      categories: categoriesResult || [],
      items: itemsResult || [],
      news: newsResult || [],
    },
  };
}

// Отримання сайту за ID
export const getSite = async (req, res) => {
  const { siteId, lang } = req.params;

  try {
    const siteQuery = getSiteQuery() + " WHERE s.langId = ? AND s.user_id = ? AND s.lang = ?";
    const siteResult = await executeQuery(siteQuery, [siteId, req.user.id, lang]);

    if (siteResult.length === 0) {
      return res.status(404).json({ message: "Лендінг не знайдено" });
    }

    const result = siteResult[0];
    const categoriesResult = await executeQuery(getCategoriesQuery(), [siteId]);
    const itemsResult = await executeQuery(getItemsQuery(), [siteId]);
    const newsResult = await executeQuery(getNewsQuery(), [siteId]);

    const response = buildSiteResponse(result, categoriesResult, itemsResult, newsResult);
    res.status(200).json(response);
  } catch (error) {
    console.error("Помилка виконання запиту: ", error.message);
    res.status(500).json({ error: "Помилка виконання запиту" });
  }
};

// Отримання сайту за назвою
export const getSiteByName = async (req, res) => {
  const { siteName, company } = req.params;

  try {
    const siteQuery = getSiteQuery() + " WHERE s.name = ? AND s.url = ?";
    const siteResult = await executeQuery(siteQuery, [company, siteName]);

    if (siteResult.length === 0) {
      return res.status(404).json({ message: "Лендінг не знайдено" });
    }

    const result = siteResult[0];
    const categoriesResult = await executeQuery(getCategoriesQuery(), [result.site_id]);
    const itemsResult = await executeQuery(getItemsQuery(), [result.site_id]);
    const newsResult = await executeQuery(getNewsQuery(), [result.site_id]);

    const response = buildSiteResponse(result, categoriesResult, itemsResult, newsResult);
    res.status(200).json(response);
  } catch (error) {
    console.error("Помилка виконання запиту: ", error.message);
    res.status(500).json({ error: "Помилка виконання запиту" });
  }
};

// Оновлення сайту
export const updateSite = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { siteId } = req.params;
  const data = JSON.parse(req.body.data);
  const { header, slider, services, info, socials, footer } = data;
  const headerLogo = req.files.logo;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Помилка початку транзакції: " + err.stack);
      return res.status(500).json({ error: "Помилка початку транзакції" });
    }

    const imageLocation = uploadFile(headerLogo[0]);

    const queries = [
      {
        query:
            "UPDATE headers SET visible = ?, logo = ?, menu = ? WHERE site_id = ?",
        params: [header.visible, imageLocation, JSON.stringify(header.menu), siteId],
      },
      {
        query: "UPDATE sliders SET visible = ?, images = ? WHERE site_id = ?",
        params: [slider.visible, JSON.stringify(slider.images), siteId],
      },
      {
        query: "UPDATE services SET visible = ?, cols = ? WHERE site_id = ?",
        params: [services.visible, JSON.stringify(services.cols), siteId],
      },
      {
        query:
            "UPDATE info SET visible = ?, image = ?, title = ?, text = ? WHERE site_id = ?",
        params: [info.visible, info.image, info.title, info.text, siteId],
      },
      {
        query:
            "UPDATE socials SET visible = ?, instagram = ?, facebook = ?, youtube = ? WHERE site_id = ?",
        params: [
          socials.visible,
          socials.instagram,
          socials.facebook,
          socials.youtube,
          siteId,
        ],
      },
      {
        query:
            "UPDATE footers SET visible = ?, work_time = ?, web_link = ? WHERE site_id = ?",
        params: [footer.visible, footer.work_time, footer.web_link, siteId],
      },
    ];

    queries.forEach((q, index) => {
      connection.query(q.query, q.params, (err) => {
        if (err) {
          return connection.rollback(() => {
            console.error("Помилка оновлення лендінгу: " + err.message);
            return res
                .status(500)
                .json({ error: "Помилка оновлення лендінгу" });
          });
        }

        if (index === queries.length - 1) {
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                console.error("Помилка коміту транзакції: " + err.message);
                return res
                    .status(500)
                    .json({ error: "Помилка коміту транзакції" });
              });
            }

            res.status(200).json({ message: "Лендінг оновлено успішно!" });
            connection.end();
          });
        }
      });
    });
  });
};

// Видалення сайту
export const deleteSite = async (req, res) => {
  const { siteId } = req.params;

  try {
    await executeQuery("DELETE FROM sites WHERE id = ? AND user_id = ?", [
      siteId,
      req.user.userId,
    ]);
    res.status(200).json({ message: "Лендінг видалено успішно!" });
  } catch (error) {
    console.error("Помилка видалення лендінгу: " + error.message);
    res.status(500).json({ error: "Помилка видалення лендінгу" });
  }
};

// Отримання всіх сайтів користувача
export const getUserSites = async (req, res) => {
  try {
    const query = "SELECT * FROM sites WHERE user_id = ?";
    const results = await executeQuery(query, [req.user.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Лендінги не знайдено" });
    }

    res.status(200).json({ sites: results });
  } catch (error) {
    console.error("Помилка виконання запиту: " + error.message);
    res.status(500).json({ error: "Помилка виконання запиту" });
  }
};

export const createLang = async (req, res) => {
  const { url, name, langId, lang} = req.body;
  const id = req.user.id;
  await createSite(id, url, name,lang, langId);

  res.json({alesGut: "sss"})
};


export async function createSite(id, url, name, lang, langId) {
  return new Promise(async (resolve, reject) => {
    try {
      // Початок транзакції
      await executeQuery("START TRANSACTION");

      if (langId === undefined) {
        langId = id;
      }

      if (lang === undefined) {
        lang = "en";
      }

      // Додавання запису у таблицю sites
      const queryInsertSite =
          "INSERT INTO sites (user_id, url, name, lang, langId) VALUES (?, ?, ?, ?, ?)";
      const result = await executeQuery(queryInsertSite, [id, url, name, lang, langId]);

      // Перевірка, чи було успішно вставлено запис
      if (!result || !result.insertId) {
        throw new Error("Failed to add site");
      }

      const siteId = result.insertId;

      // Масив із запитами для вставки
      const queries = [
        {
          query:
              "INSERT INTO headers (site_id, visible, logo, menu) VALUES (?, ?, ?, ?)",
          params: [
            siteId,
            true,
            null,
            JSON.stringify([
              { link: "#slider", text: "Home" },
              { link: "#services", text: "Services" },
              { link: "#about", text: "About Us" },
              { link: "#contact", text: "Contact Us" },
            ]),
          ],
        },
        {
          query:
              "INSERT INTO sliders (site_id, visible, images) VALUES (?, ?, ?)",
          params: [siteId, true, JSON.stringify([])],
        },
        {
          query:
              "INSERT INTO services (site_id, visible, cols) VALUES (?, ?, ?)",
          params: [
            siteId,
            true,
            JSON.stringify([
              { image: "", title: "Call", phone: null },
              { image: "", title: "Geo", link: null },
              { image: "", title: "Menu" },
              { image: "", title: "News" },
              { image: "", title: "Wifi", name: "", password: "" },
            ]),
          ],
        },
        {
          query:
              "INSERT INTO info (site_id, visible, image, title, text) VALUES (?, ?, ?, ?, ?)",
          params: [
            siteId,
            true,
            null,
            "Title",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          ],
        },
        {
          query:
              "INSERT INTO socials (site_id, visible, instagram, facebook, youtube, messenger, whatsApp, viber, x, tikTok) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          params: [
            siteId,
            true,
            "https://instagram.com",
            "https://facebook.com",
            null,
            null,
            "https://whatsapp.com",
            null,
            "https://x.com",
            null,
          ],
        },
        {
          query:
              "INSERT INTO footers (site_id, visible, work_time, web_link, first_description, second_description, end_time, start_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          params: [
            siteId,
            true,
            "Mon-Fri 9am-6pm",
            null,
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
            "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "08:00",
            "17:00"
          ],
        },
        {
          query:
              "INSERT INTO global (site_id, main_bg_color, main_text_color, site_bg_color, site_text_color) VALUES (?, ?, ?, ?, ?)",
          params: [
            siteId,
            JSON.stringify({ r: 59, g: 130, b: 246, a: 1 }),
            JSON.stringify({ r: 255, g: 255, b: 255, a: 1 }),
            JSON.stringify({ r: 255, g: 255, b: 255, a: 1 }),
            JSON.stringify({ r: 0, g: 0, b: 0, a: 1 }),
          ],
        },
        {
          query: "INSERT INTO banner (site_id, visible) VALUES (?, ?)",
          params: [siteId, false],
        },
      ];

      // Виконання запитів
      for (const { query, params } of queries) {
        const queryResult = await executeQuery(query, params);

        // Перевірка, чи запит був виконаний успішно
        if (!queryResult) {
          throw new Error(`Failed to execute query: ${query}`);
        }
      }

      // Коміт транзакції
      await executeQuery("COMMIT");

      resolve({ success: true, siteId });
    } catch (error) {
      console.error("Error executing queries: ", error.message);
      try {
        await executeQuery("ROLLBACK");
      } catch (rollbackError) {
        console.error("Error during rollback: ", rollbackError.message);
      }
      reject(new Error(`Error executing queries: ${error.message}`));
    }
  });
}

