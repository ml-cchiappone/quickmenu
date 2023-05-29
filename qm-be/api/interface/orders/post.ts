import { NextFunction, Request, Response } from "express";
import OrderPost from "../../application/usecases/orders/post";

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdOrder = await new OrderPost().execute(req.body);
    console.log("🚀 ~ file: post.ts:14 ~ createdOrder:", createdOrder?.dataValues)
    
    return res.status(200).json(createdOrder?.dataValues);
  } catch (error) {
    // await t.rollback();
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default  createOrder