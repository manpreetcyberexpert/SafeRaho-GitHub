import { Router, type IRouter } from "express";
import healthRouter from "./health";
import scannerRouter from "./scanner";
import numbersRouter from "./numbers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(scannerRouter);
router.use(numbersRouter);

export default router;
