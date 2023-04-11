import { Router } from "express";
import itemRouter from "./itemRouter.js";
import manufacturerRouter from "./manufacturerRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";
import ratingRouter from './ratingRouter.js'
import cartRouter from './cartRouter.js'

const router = new Router();


router.use('/user', userRouter); //указание подроутеров
router.use('/type', typeRouter);
router.use('/manufacturer', manufacturerRouter);
router.use('/item', itemRouter);
router.use('/rating', ratingRouter);
router.use('/cart', cartRouter)


export default router;