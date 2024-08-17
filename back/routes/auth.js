import express from "express";
import { getUser, login, register } from '../controllers/auth.js';
import multer from "multer";
const upload = multer();

const router = express.Router();


router.post('/login', upload.none(), login);
router.post('/register', upload.none(), register);
router.get('/getUser', upload.none(), getUser);


// router.post('/admin', authenticateToken, authorizeAdmin, (req, res) => {
//     res.json({ message: 'Вітаємо в адмін панелі!' });
// });


export default router;