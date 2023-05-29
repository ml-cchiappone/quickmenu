import { NextFunction, Request, Response } from "express";
import CategoriesGetAll from "../../application/usecases/categories/getAll";
import RestaurantGet from "../../application/usecases/restaurants/get";
import CategoriesGetAllWithProducts from "../../application/usecases/categories/getAllWithProducts";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const restaurant: any = await new RestaurantGet().execute(restaurantId); // TODO: tipar
    const categoryList: any = await new CategoriesGetAll().execute(
      restaurant.id
    );
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: categoryList.count
      },
      results: categoryList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export const getAllCategoriesAndProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const restaurant: any = await new RestaurantGet().execute(restaurantId); // TODO: tipar
    const categoriesAndProducts: any =
      await new CategoriesGetAllWithProducts().execute(restaurant.id);
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: categoriesAndProducts.count
      },
      results: categoriesAndProducts.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};
