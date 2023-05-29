import { NextFunction, Request, Response } from "express";
import CategoriesUpdate from "../../application/usecases/categories/update";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;

    const category = await new CategoriesUpdate().execute(
      parseInt(categoryId),
      req.body
    );
    console.log("🚀 ~ file: update.ts:12 ~ update ~ category:", category);
    return res.status(200).json(category);
  } catch (error) {
    console.log("🚀 ~ file: update.ts:15 ~ update ~ error:", error);
  }
};

export default update;
