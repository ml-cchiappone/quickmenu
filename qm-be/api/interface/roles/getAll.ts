import { NextFunction, Request, Response } from "express";
import RolesGetAll from "../../application/usecases/roles/getAll";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rolesList: any = await new RolesGetAll().execute();
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: rolesList.count
      },
      results: rolesList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: getAll.ts:17 ~ getAll ~ error:", error);
  }
};

export default getAll;
