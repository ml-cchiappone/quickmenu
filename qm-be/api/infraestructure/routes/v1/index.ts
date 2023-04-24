import { Router } from "express";
const v1 = Router();
import mobile from "./mobile";

v1.use("/mobile", mobile);

export default v1;
