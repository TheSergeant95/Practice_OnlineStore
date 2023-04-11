import { Router } from "express";
const router = new Router();
import manufacturerController from "../controllers/manufacturerController.js";
import roleCheck from '../middleware/roleCheckMiddleware.js'

router.post('/', roleCheck('ADMIN'), manufacturerController.create)
router.delete('/', roleCheck('ADMIN'), manufacturerController.delete)
router.get('/', manufacturerController.getAll)

export default router;