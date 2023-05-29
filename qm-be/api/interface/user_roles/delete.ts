import { NextFunction, Request, Response } from "express";
import UserRolesPost from "../../application/usecases/user_roles/post";
import UserRolesDelete from "../../application/usecases/user_roles/delete";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, rolId } = req.params;
    const userRoles = await new UserRolesDelete().execute(
      parseInt(userId),
      parseInt(rolId)
    );
    return res.status(200).json(userRoles);
  } catch (error) {
    console.log("🚀 ~ file: create.ts:12 ~ create ~ error:", error);
  }
};

export default create;
