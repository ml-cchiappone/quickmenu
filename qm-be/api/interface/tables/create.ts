import { NextFunction, Request, Response } from "express";
import RestaurantGet from "../../application/usecases/restaurants/get";
import TablesPost from "../../application/usecases/tables/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { restaurantId } = req.params;
    const restaurant: any = await new RestaurantGet().execute(
      restaurantId
    );
    const table = await new TablesPost().execute({
      ...req.body,
      restaurant_id: restaurant.id
    });
    console.log("🚀 ~ file: create.ts:14 ~ table ~ table:", table);
    return res.status(200).json(table);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:10 ~ create ~ error:", error);
  }
};

export default create;
