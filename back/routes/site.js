import express from "express";
import {
  createSite,
  getSite,
  updateSite,
  deleteSite,
  getUserSites,
  updateHeader,
  updateSlider,
} from "../controllers/site.js";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
const upload = multer();

const router = express.Router();

router.post("/site", upload.none(), authMiddleware, createSite);
router.get("/site/:siteId", upload.none(), authMiddleware, getSite);
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
  upload.fields([{ name: "slides", maxCount: 3 }]),
  authMiddleware,
  updateSlider
);
router.delete("/site/:siteId", upload.none(), authMiddleware, deleteSite);
router.get("/sites", upload.none(), authMiddleware, getUserSites);

export default router;
