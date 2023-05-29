import { NextFunction, Request, Response } from "express";
import ProvincesGetAll from "../../application/usecases/provinces/getAll";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provincesList: any = await new ProvincesGetAll().execute();
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: provincesList.count
      },
      results: provincesList.rows
    };
    console.log("🚀 ~ file: getAll.ts:16 ~ getAll ~ response:", response)
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: getAll.ts:17 ~ getAll ~ error:", error);
  }
};

export default getAll;
