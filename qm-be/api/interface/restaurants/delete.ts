import { NextFunction, Request, Response } from "express";
import RestaurantsDelete from "../../application/usecases/restaurants/delete";

const deleteR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await new RestaurantsDelete().execute(parseInt(restaurantId));
    console.log("🚀 ~ file: delete.ts:9 ~ get ~ restaurant:", restaurant)
    return res.status(200).json(restaurant);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default deleteR;
