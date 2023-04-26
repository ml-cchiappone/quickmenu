import { NextFunction, Request, Response } from "express";
import RestaurantsGetAll from "../../application/usecases/restaurants/getAll";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantList = await new RestaurantsGetAll().execute();
    return res.status(200).json(restaurantList);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
