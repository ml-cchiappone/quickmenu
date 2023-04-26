import { Router } from "express";
import getAll from "../../../../interface/restaurants/getAll";
import get from "../../../../interface/restaurants/get";
const router = Router();

router.get("/restaurants", getAll);
router.get("/restaurants/:restaurantId", get);

export default router;
