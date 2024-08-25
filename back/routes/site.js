import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  deleteSite,
  getSite,
  getSiteByName,
  getUserSites,
  updateSite,
} from "../controllers/siteController.js";
import { updateHeader } from "../controllers/headerController.js";
import { updateSlider } from "../controllers/sliderController.js";
import { deleteImage, uploadImage } from "../controllers/upload.js";
import { updateInfo } from "../controllers/infoController.js";
import { updateService } from "../controllers/serviceController.js";
import { updateGlobal } from "../controllers/globalController.js";
import { updateSocial } from "../controllers/social.js";
import { updateFooter } from "../controllers/footerController.js";
import { createCategory } from "../controllers/categoryController.js";
import { createItem } from "../controllers/itemController.js";

const upload = multer();
const router = express.Router();


router.post(
  "/site/upload",
  upload.single("image"),
  authMiddleware,
  uploadImage
);
router.post("/site/delete", upload.none(), authMiddleware, deleteImage);
router.get("/site/id/:siteId", upload.none(), authMiddleware, getSite);
router.get("/site/:siteName", upload.none(), getSiteByName);

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

router.put("/site/social/:siteId", upload.none(), authMiddleware, updateSocial);

router.put("/site/footer/:siteId", upload.none(), authMiddleware, updateFooter);

router.delete("/site/:siteId", upload.none(), authMiddleware, deleteSite);

router.put("/site/services/:serviceId", upload.none(), authMiddleware, updateService);

router.put("/site/global/:siteId", upload.none(), authMiddleware, updateGlobal);

router.get("/sites", upload.none(), authMiddleware, getUserSites);

router.post("/category/:siteId", upload.single("image"), authMiddleware, createCategory);

router.post("/item/:siteId", upload.single("image"), authMiddleware, createItem);

export default router;
