import { Router } from "express";
import CartController from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.get('/getCart', authMiddleware, CartController.getCart)
router.get('/getCartItems', authMiddleware, CartController.getCartItems)
router.post('/item/:itemId/append/:quantity([0-9]+)', authMiddleware, CartController.append)
router.put('/item/:itemId/increment/:quantity([0-9]+)', authMiddleware, CartController.increment)
router.put('/item/:itemId/decrement/:quantity([0-9]+)', authMiddleware, CartController.decrement)
router.delete('/item/:itemId/remove', authMiddleware, CartController.remove)
router.delete('/clear', authMiddleware, CartController.clear)

export default router;