import { NextFunction, Request, Response } from "express";
import ProductsUpdate from "../../application/usecases/products/update";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const product = await new ProductsUpdate().execute(
      parseInt(productId),
      req.body
    );
    console.log("🚀 ~ file: update.ts:12 ~ update ~ product:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.log("🚀 ~ file: update.ts:15 ~ update ~ error:", error);
  }
};

export default update;
