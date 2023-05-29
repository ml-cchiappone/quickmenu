import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import UsersPost from "../../application/usecases/users/post";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body?.password, salt);
    const user = await new UsersPost().execute({ ...req.body, password });
    console.log("🚀 ~ file: create.ts:8 ~ create ~ user:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default create;
