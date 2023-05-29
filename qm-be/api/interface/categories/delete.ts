import { NextFunction, Request, Response } from "express";
import CategoriesDelete from "../../application/usecases/categories/delete";

const deleteR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;

    const category = await new CategoriesDelete().execute(parseInt(categoryId));
    console.log("🚀 ~ file: delete.ts:9 ~ deleteR ~ category:", category);
    return res.status(200).json(category);
  } catch (error) {
    console.log("🚀 ~ file: delete.ts:12 ~ deleteR ~ error:", error);
  }
};

export default deleteR;
