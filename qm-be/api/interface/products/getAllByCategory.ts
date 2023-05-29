import { NextFunction, Request, Response } from "express";
import ProductsGetAllByCategory from "../../application/usecases/products/getAllByCategory";

const getAllProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const productList: any = await new ProductsGetAllByCategory().execute(
      parseInt(categoryId)
    );
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: productList.count
      },
      results: productList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAllProductsByCategory;
