import { NextFunction, Request, Response } from "express";
import ProductsGet from "../../application/usecases/products/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const product = await new ProductsGet().execute(productId);
    return res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
