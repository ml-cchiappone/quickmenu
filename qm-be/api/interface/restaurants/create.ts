import { NextFunction, Request, Response } from "express";
import RestaurantsPost from "../../application/usecases/restaurants/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await new RestaurantsPost().execute(req.body);
    console.log("🚀 ~ file: create.ts:7 ~ create ~ restaurant:", restaurant);
    return res.status(200).json(restaurant);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:10 ~ create ~ error:", error);
  }
};

export default create;
