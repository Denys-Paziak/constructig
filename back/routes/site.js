import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createLang,
  createSite,
  deleteSite,
  getSite,
  getSiteByName,
  getUserSites,
  updateSite,
  cloneSiteWithNewLanguage // Додаємо функцію для клонування сайту на новій мові
} from "../controllers/siteController.js";
import { updateHeader } from "../controllers/headerController.js";
import { updateSlider } from "../controllers/sliderController.js";
import { deleteImage, uploadImage } from "../controllers/upload.js";
import { updateInfo } from "../controllers/infoController.js";
import { updateService } from "../controllers/serviceController.js";
import { updateGlobal } from "../controllers/globalController.js";
import { updateSocial } from "../controllers/social.js";
import { updateFooter } from "../controllers/footerController.js";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  createItem,
  deleteItem,
  getItemById,
  updateItem,
} from "../controllers/itemController.js";
import {
  createNews,
  deleteNews,
  getNewsById,
  updateNews,
} from "../controllers/newsController.js";
import { updateBanner } from "../controllers/banner.js";
import { register } from "../controllers/auth.js";

const upload = multer();
const router = express.Router();

router.post(
    "/site/upload",
    upload.single("image"),
    authMiddleware,
    uploadImage
);
router.post("/site/delete", upload.none(), authMiddleware, deleteImage);
router.get("/site/id/:siteId/:lang", upload.none(), authMiddleware, getSite);
router.get("/site/:siteName/:company/:lang", upload.none(), getSiteByName);

router.put(
    "/site/:siteId",
    upload.fields([{ name: "logo", maxCount: 1 }]),
    authMiddleware,
    updateSite
);
router.put(
    "/site/header/:siteId",
    upload.fields([{ name: "logo", maxCount: 1 }]),
    authMiddleware,
    updateHeader
);

router.put("/site/slider/:siteId", upload.none(), authMiddleware, updateSlider);

router.put("/site/info/:siteId", upload.none(), authMiddleware, updateInfo);

router.put("/site/banner/:siteId", upload.none(), authMiddleware, updateBanner);

router.put("/site/social/:siteId", upload.none(), authMiddleware, updateSocial);

router.put("/site/footer/:siteId", upload.none(), authMiddleware, updateFooter);

router.delete("/site/:siteId", upload.none(), authMiddleware, deleteSite);

router.put(
    "/site/services/:serviceId",
    upload.none(),
    authMiddleware,
    updateService
);

router.put("/site/global/:siteId", upload.none(), authMiddleware, updateGlobal);

router.get("/sites", upload.none(), authMiddleware, getUserSites);

router.post(
    "/category/:siteId",
    upload.single("image"),
    authMiddleware,
    createCategory
);
router.get(
    "/category/get/:categoryId",
    upload.none(),
    authMiddleware,
    getCategoryById
);
router.post(
    "/category/update/:categoryId",
    upload.single("image"),
    authMiddleware,
    updateCategory
);

router.delete(
    "/deleteCategory/:categoryId",
    upload.none(),
    authMiddleware,
    deleteCategory
);

router.post(
    "/item/:siteId",
    upload.single("image"),
    authMiddleware,
    createItem
);
router.delete("/deleteItem/:itemId", upload.none(), authMiddleware, deleteItem);
router.get("/item/get/:itemId", upload.none(), authMiddleware, getItemById);
router.post(
    "/item/update/:itemId",
    upload.single("image"),
    authMiddleware,
    updateItem
);

router.post(
    "/news/:siteId",
    upload.single("image"),
    authMiddleware,
    createNews
);
router.delete("/deleteNews/:newsId", upload.none(), authMiddleware, deleteNews);
router.get("/news/get/:newsId", upload.none(), authMiddleware, getNewsById);
router.post(
    "/news/update/:newsId",
    upload.single("image"),
    authMiddleware,
    updateNews
);

// Додаємо новий маршрут для створення сайту на новій мові
router.post(
    '/site/clone-lang',
    upload.none(),
    authMiddleware,
    cloneSiteWithNewLanguage
);

router.post('/site/createLang', upload.none(), authMiddleware, createLang);

export default router;
