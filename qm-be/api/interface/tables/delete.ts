import { NextFunction, Request, Response } from "express";
import TablesDelete from "../../application/usecases/tables/delete";

const deleteR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableId } = req.params;

    const table = await new TablesDelete().execute(parseInt(tableId));
    console.log("🚀 ~ file: delete.ts:9 ~ deleteR ~ table:", table);
    return res.status(200).json(table);
  } catch (error) {
    console.log("🚀 ~ file: delete.ts:12 ~ deleteR ~ error:", error);
  }
};

export default deleteR;
