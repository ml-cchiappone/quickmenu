import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UsersAuth from "../../application/usecases/users/auth";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userAuth: any = await new UsersAuth().execute(email, password);

    const isSame = await bcrypt.compare(password, userAuth.password);
    delete userAuth.dataValues.password;

    if (isSame) {
      return res.status(200).json(userAuth);
    }
    return res.status(401).send();
  } catch (error) {
    console.log("🚀 ~ file: auth.ts:12 ~ get ~ error:", error);
  }
};

export default auth;
