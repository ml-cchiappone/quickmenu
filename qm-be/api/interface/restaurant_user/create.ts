import { NextFunction, Request, Response } from "express";
import RestaurantUsersPost from "../../application/usecases/restaurant_users/post";
import RestaurantsGet from "../../application/usecases/restaurants/get";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant: any = await new RestaurantsGet().execute(
      req.body.restaurant_id
    );
    const restaurantUsers = await new RestaurantUsersPost().execute({
      ...req.body,
      restaurant_id: restaurant.id
    });
    return res.status(200).json(restaurantUsers);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:9 ~ create ~ r:", error);
  }
};

export default create;
