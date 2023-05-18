import { NextFunction, Request, Response } from "express";
import OrdersGet from "../../application/usecases/orders/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;

    const order = await new OrdersGet().execute(Number(orderId));
    return res.status(200).json(order);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
