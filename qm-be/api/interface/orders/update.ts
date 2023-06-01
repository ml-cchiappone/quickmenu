import { NextFunction, Request, Response } from "express";
import OrderUpdate from "../../application/usecases/orders/update";
import OrderStatusGet from "../../application/usecases/order_status/get";

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status_code } = req.body;

    const orderStatus: any = await new OrderStatusGet().execute(status_code);
    const updatedOrder = await new OrderUpdate().execute(parseInt(orderId), {
      order_status_id: orderStatus.id
    });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log("🚀 ~ file: update.ts:13 ~ updateOrder ~ error:", error);
  }
};

export default updateOrder;
