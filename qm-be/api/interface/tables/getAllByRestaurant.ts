import { NextFunction, Request, Response } from "express";
import RestaurantGet from "../../application/usecases/restaurants/get";
import TablesGetAllByRestaurant from "../../application/usecases/tables/getAllByRestaurant";

const getAllTablesByRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantId } = req.params;
    const restaurant: any = await new RestaurantGet().execute(
      restaurantId
    );
    const tableList: any = await new TablesGetAllByRestaurant().execute(
      restaurant.id
    );
    console.log(tableList);
    
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: tableList.count
      },
      results: tableList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAllTablesByRestaurant;
