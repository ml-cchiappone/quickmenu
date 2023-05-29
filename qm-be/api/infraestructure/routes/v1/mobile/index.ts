import { Router } from "express";
import getAllRestaurants from "../../../../interface/restaurants/getAll";
import getRestaurant from "../../../../interface/restaurants/get";
import deleteRestaurant from "../../../../interface/restaurants/delete";
import updateRestaurant from "../../../../interface/restaurants/update";
import createRestaurant from "../../../../interface/restaurants/create";
import {
  getAllCategories,
  getAllCategoriesAndProducts
} from "../../../../interface/categories/getAll";
import getCategory from "../../../../interface/categories/get";
import createCategory from "../../../../interface/categories/create";
import deleteCategory from "../../../../interface/categories/delete";
import updateCategory from "../../../../interface/categories/update";

import getAllTablesByRestaurant from "../../../../interface/tables/getAllByRestaurant";
import getTable from "../../../../interface/tables/get";
import createTable from "../../../../interface/tables/create";
import deleteTable from "../../../../interface/tables/delete";
import updateTable from "../../../../interface/tables/update";

import getAllProductsByCategory from "../../../../interface/products/getAllByCategory";
import createProduct from "../../../../interface/products/create";
import deleteProduct from "../../../../interface/products/delete";
import updateProduct from "../../../../interface/products/update";

import createOrder from "../../../../interface/orders/post";
import getOrder from "../../../../interface/orders/get";

import getUser from "../../../../interface/users/get";
import createUser from "../../../../interface/users/create";
import getAllUsers from "../../../../interface/users/getAll";
import auth from "../../../../interface/users/auth";

import getAllRoles from "../../../../interface/roles/getAll";
import createUserRol from "../../../../interface/user_roles/create";
import deleteUserRol from "../../../../interface/user_roles/delete";

import getAllProvinces from "../../../../interface/provinces/getAll";

const router = Router();

// Auth
router.post("/auth", auth);

// Restaurants
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:restaurantId", getRestaurant);
router.delete("/restaurants/:restaurantId", deleteRestaurant);
router.post("/restaurants/:restaurantId", updateRestaurant);
router.post("/restaurants", createRestaurant);

// Categories
router.delete(
  "/restaurants/:restaurantId/categories/:categoryId",
  deleteCategory
);
router.post(
  "/restaurants/:restaurantId/categories/:categoryId",
  updateCategory
);
router.post("/restaurants/:restaurantId/categories", createCategory);
router.get("/restaurants/:restaurantId/categories", getAllCategories);
router.get("/restaurants/:restaurantId/categories/:categoryId", getCategory);
// Tables
router.delete("/restaurants/:restaurantId/tables/:tableId", deleteTable);
router.post("/restaurants/:restaurantId/tables/:tableId", updateTable);
router.get("/restaurants/:restaurantId/tables/:tableId", getTable);
router.post("/restaurants/:restaurantId/tables", createTable);
router.get("/restaurants/:restaurantId/tables", getAllTablesByRestaurant);
// Products
router.delete(
  "/restaurants/:restaurantId/categories/:categoryId/products/:productId",
  deleteProduct
);
router.post(
  "/restaurants/:restaurantId/categories/:categoryId/products/:productId",
  updateProduct
);
router.post(
  "/restaurants/:restaurantId/categories/:categoryId/products",
  createProduct
);
router.get(
  "/restaurants/:restaurantId/categories/:categoryId/products",
  getAllProductsByCategory
);
router.get(
  "/restaurants/:restaurantId/categories/products",
  getAllCategoriesAndProducts
);

// Orders
router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.get("/orders/:orderId", getOrder);

// Users
router.get("/users/:userId", getUser);
router.post("/users", createUser);
router.get("/users", getAllUsers);

router.post("/users/:userId/roles", createUserRol);
router.delete("/users/:userId/roles/:rolId", deleteUserRol);

// Roles
router.get("/roles", getAllRoles);

// Roles
router.get("/provinces", getAllProvinces);

export default router;
