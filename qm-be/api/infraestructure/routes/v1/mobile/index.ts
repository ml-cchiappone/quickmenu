import { Request, Response, Router } from "express";
const router = Router();

router.get("/restaurants", (req: Request, res: Response) => {
  res.send("Hello restaurants!");
});
router.get("/restaurants/:restaurantId", (req: Request, res: Response) => {
  res.send(`Hello ${req.params.restaurantId}`);
});

export default router;
