import { NextFunction, Request, Response } from "express";
import UsersGetAll from "../../application/usecases/users/getAll";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersList: any = await new UsersGetAll().execute();
    console.log("🚀 ~ file: getAll.ts:7 ~ getAll ~ usersList:", usersList);
    const response = {
      paging: {
        limit: null,
        offset: null,
        total: usersList.count
      },
      results: usersList.rows
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
