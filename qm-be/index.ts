import express, { Request, Response } from "express";
import bodyParser from "body-parser";
// import { Sequelize } from 'sequelize-typescript';
// import jwt from 'jsonwebtoken';

const app = express();
const port = 8080;

// const sequelize = new Sequelize({
//   database: 'mydatabase',
//   dialect: 'mysql',
//   username: 'myuser',
//   password: 'mypassword',
//   modelPaths: [__dirname + '/models'],
// });

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

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
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// });
