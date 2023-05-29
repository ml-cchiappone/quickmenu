import { NextFunction, Request, Response } from "express";
import TablesUpdate from "../../application/usecases/tables/update";

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableId } = req.params;
    const table = await new TablesUpdate().execute(
      parseInt(tableId),
      req.body
    );
    console.log("🚀 ~ file: update.ts:12 ~ update ~ product:", table);
    return res.status(200).json(table);
  } catch (error) {
    console.log("🚀 ~ file: update.ts:15 ~ update ~ error:", error);
  }
};

export default update;
