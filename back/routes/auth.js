import express, {response} from "express";
import {changePassword, getUser, login, register, resetPassSend, updateUser} from '../controllers/auth.js';
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
const upload = multer();

const router = express.Router();


router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);
router.get('/getUser', upload.none(), getUser);
router.put("/update", upload.none(), updateUser);

router.post("/resetsend", upload.none(), resetPassSend );
router.put("/reset", upload.none(),  changePassword);

export default router;