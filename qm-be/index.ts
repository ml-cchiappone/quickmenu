import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./api/infraestructure/routes";
import sequelize from "./api/infraestructure/persistence/mysql.config";
import cors from "cors";

const api = express();
const port = 8080;

api.use(bodyParser.json());

const whiteList=['http://localhost:4200','http://localhost:4201', 'https://cchiappone-quickmenu.my.kube.um.edu.ar'];
api.use(cors({origin: whiteList}));
api.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.use("/", router);

// app.get('/protected', (req: Request, res: Response) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token!, 'secret');
//     res.json({ message: 'Protected data', user: decoded.username });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });
sequelize.sync().then(() => {
  api.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
