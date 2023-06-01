import { NextFunction, Request, Response } from "express";
import RolesGetAllUsersByRol from "../../application/usecases/roles/getAllUsersByRol";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rolCode } = req.params;
    const usersList: any = await new RolesGetAllUsersByRol().execute(rolCode);
    console.log("🚀 ~ file: getAllByRol.ts:8 ~ getAll ~ usersList:", usersList);
    return res.status(200).json(usersList);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ list ~ error:", error);
  }
};

export default getAll;
