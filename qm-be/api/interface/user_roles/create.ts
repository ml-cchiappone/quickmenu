import { NextFunction, Request, Response } from "express";
import UserRolesPost from "../../application/usecases/user_roles/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRoles = await new UserRolesPost().execute(req.body);
    return res.status(200).json(userRoles);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:12 ~ create ~ error:", error);
  }
};

export default create;
