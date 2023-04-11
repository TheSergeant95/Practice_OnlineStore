import {Router} from "express";
import RatingController from "../controllers/ratingController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/item/:itemId', authMiddleware, RatingController.getRating)
router.post('/item/:itemId/rate/:rate([1-5])', authMiddleware, RatingController.create)

export default router;
