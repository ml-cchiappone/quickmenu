import { NextFunction, Request, Response } from "express";
import CategoriesGet from "../../application/usecases/categories/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;

    const category = await new CategoriesGet().execute(categoryId);
    return res.status(200).json(category);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
