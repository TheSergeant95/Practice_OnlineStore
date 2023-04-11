import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();


router.post('/register', userController.register) //функцию передаём как объект
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router;