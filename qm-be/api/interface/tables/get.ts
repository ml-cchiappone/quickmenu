import { NextFunction, Request, Response } from "express";
import TablesGet from "../../application/usecases/tables/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tableId } = req.params;

    const table = await new TablesGet().execute(tableId);
    return res.status(200).json(table);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
