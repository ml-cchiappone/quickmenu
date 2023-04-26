import { NextFunction, Request, Response } from "express";
import CategoriesGetAll from "../../application/usecases/categories/getAll";
import RestaurantGet from "../../application/usecases/restaurants/get";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;
    const restaurant: any = await new RestaurantGet().execute(restaurantId); // TODO: tipar
    const categoryList = await new CategoriesGetAll().execute(
      restaurant.id
    );
    return res.status(200).json(categoryList);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
