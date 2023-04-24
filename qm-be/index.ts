import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./api/infraestructure/routes";
// import { Sequelize } from 'sequelize-typescript';
// import jwt from 'jsonwebtoken';

const api = express();
const port = 8080;

// const sequelize = new Sequelize({
//   database: 'mydatabase',
//   dialect: 'mysql',
//   username: 'myuser',
//   password: 'mypassword',
//   modelPaths: [__dirname + '/models'],
// });

api.use(bodyParser.json());

api.use("/", router);


// app.post('/login', (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (username === 'admin' && password === 'admin') {
//     const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

// app.get('/protected', (req: Request, res: Response) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token!, 'secret');
//     res.json({ message: 'Protected data', user: decoded.username });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// sequelize.sync().then(() => {
api.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// });
