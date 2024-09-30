import { uploadFile } from "../util/uploadFile.js";
import mysql from "mysql";
import dbConfig from "../config/dbConfig.js";

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

// Отримання сайту за ID
export const getSite = async (req, res) => {
  const { siteId } = req.params;

  try {
    const siteQuery = `
      SELECT 
        s.id AS site_id, s.url AS site_url, s.name AS site_name,
        h.visible AS header_visible, h.logo AS header_logo, h.menu AS header_menu,
        sl.visible AS slider_visible, sl.images AS slider_images,
        se.visible AS services_visible, se.cols AS services_cols,
        i.visible AS info_visible, i.image AS info_image, i.title AS info_title, i.text AS info_text,
        so.visible AS socials_visible, so.instagram AS socials_instagram, so.facebook AS socials_facebook, so.youtube AS socials_youtube, so.messenger AS socials_messenger, so.whatsApp AS socials_whatsApp, so.viber AS socials_viber, so.x AS socials_x, so.tikTok AS socials_tikTok,
        f.visible AS footer_visible, f.work_time AS footer_work_time, f.web_link AS footer_web_link, f.first_description AS footer_first_description, f.second_description AS footer_second_description,
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
      WHERE s.id = ? AND s.user_id = ?`;

    const siteResult = await executeQuery(siteQuery, [siteId, req.user.id]);

    if (siteResult.length === 0) {
      return res.status(404).json({ message: "Лендінг не знайдено" });
    }

    const result = siteResult[0];

    // Отримання категорій
    const categoriesQuery = "SELECT * FROM categories WHERE site_id = ?";
    const categoriesResult = await executeQuery(categoriesQuery, [siteId]);

    // Отримання продуктів (items)
    const itemsQuery = `
      SELECT i.id,i.isPopular, i.name, i.description, i.price, i.image, c.name AS category_name
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.site_id = ? ORDER BY isPopular DESC`;

    const itemsResult = await executeQuery(itemsQuery, [siteId]);

    // Отримання новин (news)
    const newsQuery = "SELECT * FROM news WHERE site_id = ?";
    const newsResult = await executeQuery(newsQuery, [siteId]);

    // Формування об'єкта для відправки на фронт
    const site = {
      id: result.site_id,
      url: result.site_url,
      name: result.site_name,
    };

    const header = {
      visible: result.header_visible,
      logo: result.header_logo,
      menu: JSON.parse(result.header_menu),
    };

    const slider = {
      visible: result.slider_visible,
      images: JSON.parse(result.slider_images),
    };

    const services = {
      visible: result.services_visible,
      cols: JSON.parse(result.services_cols),
    };

    const info = {
      visible: result.info_visible,
      image: result.info_image,
      title: result.info_title,
      text: result.info_text,
    };

    const socials = {
      visible: result.socials_visible,
      instagram: result.socials_instagram,
      facebook: result.socials_facebook,
      youtube: result.socials_youtube,
      messenger: result.socials_messenger,
      whatsApp: result.socials_whatsApp,
      viber: result.socials_viber,
      x: result.socials_x,
      tikTok: result.socials_tikTok,
    };

    const footer = {
      visible: result.footer_visible,
      work_time: result.footer_work_time,
      web_link: result.footer_web_link,
      first_description: result.footer_first_description,
      second_description: result.footer_second_description,
    };

    const banner = {
      visible: result.banner_visible,
    };

    const global = {
      main_bg_color: JSON.parse(result.global_main_bg_color),
      main_text_color: JSON.parse(result.global_main_text_color),
      site_bg_color: JSON.parse(result.global_site_bg_color),
      site_text_color: JSON.parse(result.global_site_text_color),
      categories: categoriesResult || [], // Додаємо категорії
      items: itemsResult || [], // Додаємо продукти (items)
      news: newsResult || [], // Додаємо новини (news)
    };

    res.status(200).json({
      site,
      header,
      slider,
      services,
      info,
      socials,
      footer,
      banner,
      global,
    });
  } catch (error) {
    console.error("Помилка виконання запиту: ", error.message);
    res.status(500).json({ error: "Помилка виконання запиту" });
  }
};

// Отримання сайту за назвою
export const getSiteByName = async (req, res) => {
  const { siteName, company } = req.params;

  try {
    const siteQuery = `
      SELECT 
        s.id AS site_id, s.url AS site_url, s.name AS site_name,
        h.visible AS header_visible, h.logo AS header_logo, h.menu AS header_menu,
        sl.visible AS slider_visible, sl.images AS slider_images,
        se.visible AS services_visible, se.cols AS services_cols,
        i.visible AS info_visible, i.image AS info_image, i.title AS info_title, i.text AS info_text,
        so.visible AS socials_visible, so.instagram AS socials_instagram, so.facebook AS socials_facebook, so.youtube AS socials_youtube, so.messenger AS socials_messenger, so.whatsApp AS socials_whatsApp, so.viber AS socials_viber, so.x AS socials_x, so.tikTok AS socials_tikTok,
        f.visible AS footer_visible, f.work_time AS footer_work_time, f.web_link AS footer_web_link, f.first_description AS footer_first_description, f.second_description AS footer_second_description,
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
      WHERE s.name = ? AND s.url = ?`;

    const siteResult = await executeQuery(siteQuery, [company, siteName]);

    if (siteResult.length === 0) {
      return res.status(404).json({ message: "Лендінг не знайдено" });
    }

    const result = siteResult[0];

    // Отримання категорій
    const categoriesQuery = "SELECT * FROM categories WHERE site_id = ?";
    const categoriesResult = await executeQuery(categoriesQuery, [
      result.site_id,
    ]);

    // Отримання продуктів (items)
    const itemsQuery = `
      SELECT i.id,i.isPopular, i.name, i.description, i.price, i.image, c.name AS category_name
      FROM items i
      LEFT JOIN categories c ON i.category_id = c.id
      WHERE i.site_id = ? ORDER BY isPopular ASC`;
    const itemsResult = await executeQuery(itemsQuery, [result.site_id]);

    // Отримання новин (news)
    const newsQuery = "SELECT * FROM news WHERE site_id = ?";
    const newsResult = await executeQuery(newsQuery, [result.site_id]);

    // Формування об'єкта для відправки на фронт
    const site = {
      id: result.site_id,
      url: result.site_url,
      name: result.site_name,
    };

    const header = {
      visible: result.header_visible,
      logo: result.header_logo,
      menu: JSON.parse(result.header_menu),
    };

    const slider = {
      visible: result.slider_visible,
      images: JSON.parse(result.slider_images),
    };

    const services = {
      visible: result.services_visible,
      cols: JSON.parse(result.services_cols),
    };

    const info = {
      visible: result.info_visible,
      image: result.info_image,
      title: result.info_title,
      text: result.info_text,
    };

    const socials = {
      visible: result.socials_visible,
      instagram: result.socials_instagram,
      facebook: result.socials_facebook,
      youtube: result.socials_youtube,
      messenger: result.socials_messenger,
      whatsApp: result.socials_whatsApp,
      viber: result.socials_viber,
      x: result.socials_x,
      tikTok: result.socials_tikTok,
    };

    const footer = {
      visible: result.footer_visible,
      work_time: result.footer_work_time,
      web_link: result.footer_web_link,
      first_description: result.footer_first_description,
      second_description: result.footer_second_description,
    };

    const banner = {
      visible: result.banner_visible,
    };

    const global = {
      main_bg_color: JSON.parse(result.global_main_bg_color),
      main_text_color: JSON.parse(result.global_main_text_color),
      site_bg_color: JSON.parse(result.global_site_bg_color),
      site_text_color: JSON.parse(result.global_site_text_color),
      categories: categoriesResult || [],
      items: itemsResult || [],
      news: newsResult || [],
    };

    res.status(200).json({
      site,
      header,
      slider,
      services,
      info,
      socials,
      footer,
      banner,
      global,
    });
  } catch (error) {
    console.error("Помилка виконання запиту: ", error.message);
    res.status(500).json({ error: "Помилка виконання запиту" });
  }
};

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
        params: [
          header.visible,
          imageLocation,
          JSON.stringify(header.menu),
          siteId,
        ],
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

        // Перевіряємо, чи це останній запит
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

export const deleteSite = async (req, res) => {
  const { siteId } = req.params;

  try {
    await pool.query("DELETE FROM sites WHERE id = ? AND user_id = ?", [
      siteId,
      req.user.userId,
    ]);
    res.status(200).json({ message: "Лендінг видалено успішно!" });
  } catch (error) {
    console.error("Помилка видалення лендінгу: " + error.message);
    res.status(500).json({ error: "Помилка видалення лендінгу" });
  }
};

export const getUserSites = async (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Помилка підключення до бази даних: " + err.stack);
      return res
        .status(500)
        .json({ error: "Помилка підключення до бази даних" });
    }

    const query = "SELECT * FROM sites WHERE user_id = ?";

    connection.query(query, [req.user.id], (err, results) => {
      if (err) {
        console.error("Помилка виконання запиту: " + err.message);
        return res.status(500).json({ error: "Помилка виконання запиту" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Лендінги не знайдено" });
      }

      res.status(200).json({ sites: results });

      connection.end();
    });
  });
};
