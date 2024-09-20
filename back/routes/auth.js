import express, {response} from "express";
import {getUser, login, register, resetPassSend, updateUser} from '../controllers/auth.js';
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
const upload = multer();

const router = express.Router();


router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);
router.get('/getUser', upload.none(), getUser);
router.put("/update", upload.none(), updateUser);

router.get("/reset", upload.none(), authMiddleware, resetPassSend);
// router.put("/reset2", upload.none(), authMiddleware, resetPass);

export default router;