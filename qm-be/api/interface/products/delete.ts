import { NextFunction, Request, Response } from "express";
import ProductsDelete from "../../application/usecases/products/delete";

const deleteR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const product = await new ProductsDelete().execute(parseInt(productId));
    console.log("🚀 ~ file: delete.ts:9 ~ deleteR ~ product:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ~ file: delete.ts:12 ~ deleteR ~ error:", error);
  }
};

export default deleteR;
