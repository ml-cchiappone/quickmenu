import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
const util = require("util");
const jwt = require("jsonwebtoken");
import UsersAuth from "../../application/usecases/users/auth";
const signJwt = util.promisify(jwt.sign);

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userAuth: any = await new UsersAuth().execute(email, password);
    if(!userAuth){
      return res.status(401).send();
    }
    const isSame = await bcrypt.compare(password, userAuth.password);
    delete userAuth.dataValues.password;

    if (isSame) { 
      // TODO: Llevar a secret
      const token = await signJwt(
        {
          id: userAuth.id,
          email: userAuth.email
        },
        "cafebabe07fb5789acd899123",
        { expiresIn: "1d" }
      );
      return res.send({ token, userAuth });
    }
    return res.status(401).send();
  } catch (error) {
    console.log("🚀 ~ file: auth.ts:12 ~ get ~ error:", error);
  }
};

export default auth;
