import { NextFunction, Request, Response } from "express";
import RestaurantsUpdate from "../../application/usecases/restaurants/update";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await new RestaurantsUpdate().execute(
      parseInt(restaurantId),
      req.body
    );
    console.log("🚀 ~ file: delete.ts:9 ~ get ~ restaurant:", restaurant);
    return res.status(200).json(restaurant);
  } catch (error) {
  console.log("🚀 ~ file: update.ts:15 ~ update ~ error:", error)
  }
};

export default update;
