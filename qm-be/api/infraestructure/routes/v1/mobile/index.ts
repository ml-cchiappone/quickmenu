import { Router } from "express";
import getAllRestaurants from "../../../../interface/restaurants/getAll";
import getRestaurant from "../../../../interface/restaurants/get";
import getAllCategories from "../../../../interface/categories/getAll";
import getCategory from "../../../../interface/categories/get";

const router = Router();

router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:restaurantId", getRestaurant);
router.get("/restaurants/:restaurantId/categories", getAllCategories);
router.get("/restaurants/:restaurantId/categories/:categoryId", getCategory);

export default router;
