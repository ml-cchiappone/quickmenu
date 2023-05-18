import { NextFunction, Request, Response } from "express";
import RestaurantsGet from "../../application/usecases/restaurants/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await new RestaurantsGet().execute(restaurantId);
    console.log("🚀 ~ file: get.ts:9 ~ get ~ restaurant:", restaurant)
    return res.status(200).json(restaurant);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
