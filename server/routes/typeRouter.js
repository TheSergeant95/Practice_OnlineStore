import { Router } from "express";
const router = new Router();
import typeController from "../controllers/typeController.js";
import roleCheck from '../middleware/roleCheckMiddleware.js'

router.post('/', roleCheck('ADMIN'), typeController.create)
router.delete('/', roleCheck('ADMIN'), typeController.delete)
router.get('/', typeController.getAll)

export default router;