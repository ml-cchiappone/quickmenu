import { NextFunction, Request, Response } from "express";
import RestaurantGet from "../../application/usecases/restaurants/get";
import CategoriesPost from "../../application/usecases/categories/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant: any = await new RestaurantGet().execute(
      req.body.restaurant_id
    );
    const category = await new CategoriesPost().execute({...req.body, restaurant_id: restaurant.id});
    console.log("🚀 ~ file: create.ts:7 ~ create ~ category:", category);
    return res.status(200).json(category);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:10 ~ create ~ error:", error);
  }
};

export default create;
