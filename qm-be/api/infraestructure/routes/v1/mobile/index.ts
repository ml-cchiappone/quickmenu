import { Router } from "express";
import getAllRestaurants from "../../../../interface/restaurants/getAll";
import getRestaurant from "../../../../interface/restaurants/get";
import {
  getAllCategories,
  getAllCategoriesAndProducts
} from "../../../../interface/categories/getAll";
import getCategory from "../../../../interface/categories/get";
import { createOrder } from "../../../../interface/orders/post";
import getOrder from "../../../../interface/orders/get";

import getUser from "../../../../interface/users/get";

const router = Router();

// Restaurants
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:restaurantId", getRestaurant);
router.get("/restaurants/:restaurantId/categories", getAllCategories);
router.get(
  "/restaurants/:restaurantId/categories/products",
  getAllCategoriesAndProducts
);
router.get("/restaurants/:restaurantId/categories/:categoryId", getCategory);

// Orders
router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.get("/orders/:orderId", getOrder);

// Users
router.get("/users/:userId", getUser);

export default router;
