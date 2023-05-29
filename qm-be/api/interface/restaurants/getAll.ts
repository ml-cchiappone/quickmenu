import { NextFunction, Request, Response } from "express";
import RestaurantsGetAll from "../../application/usecases/restaurants/getAll";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantList: any = await new RestaurantsGetAll().execute();
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: restaurantList.count
      },
      results: restaurantList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
