import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createSite,
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

const upload = multer();
const router = express.Router();

// router.post("/site", upload.none(), authMiddleware, createSite);

router.post("/site/upload", upload.single("image"), authMiddleware, uploadImage);
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

router.put(
  "/site/slider/:siteId",
  upload.none(),
  authMiddleware,
  updateSlider
);

router.put(
  "/site/info/:siteId",
  upload.none(),
  authMiddleware,
  updateInfo
);

router.delete("/site/:siteId", upload.none(), authMiddleware, deleteSite);

router.get("/sites", upload.none(), authMiddleware, getUserSites);

export default router;
