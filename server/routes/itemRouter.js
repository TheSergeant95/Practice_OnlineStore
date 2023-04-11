import { Router } from "express";
const router = new Router();
import itemController from "../controllers/itemController.js"
import roleCheck from '../middleware/roleCheckMiddleware.js'

router.post('/', roleCheck('ADMIN'), itemController.create)
router.delete('/', roleCheck('ADMIN'), itemController.deleteItem)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getItem)

export default router;