import { NextFunction, Request, Response } from "express";
import RestaurantsGetOrderByOrderStatus from "../../application/usecases/restaurants/getOrdersByOrderStatus";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, restaurantId } = req.params;
    const ordersByStatus: any =
      await new RestaurantsGetOrderByOrderStatus().execute(
        restaurantId,
        status
      );
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: ordersByStatus.count
      },
      results: ordersByStatus.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
