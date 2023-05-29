import { NextFunction, Request, Response } from "express";
import RestaurantGet from "../../application/usecases/restaurants/get";
import ProductsPost from "../../application/usecases/products/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant: any = await new RestaurantGet().execute(
      req.body.restaurant_id
    );
    const product = await new ProductsPost().execute({
      ...req.body,
      restaurant_id: restaurant.id
    });
    console.log("🚀 ~ file: create.ts:11 ~ create ~ product:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:10 ~ create ~ error:", error);
  }
};

export default create;
