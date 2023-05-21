import { NextFunction, Request, Response } from "express";
import UsersGet from "../../application/usecases/users/get";

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = await new UsersGet().execute(parseInt(userId));
    console.log("🚀 ~ file: get.ts:9 ~ get ~ user:", user);
    return res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ file: get.ts:9 ~ get ~ error:", error);
  }
};

export default get;
