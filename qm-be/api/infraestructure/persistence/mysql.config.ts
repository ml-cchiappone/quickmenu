import { Options, Sequelize } from "sequelize";
import process from "process";

const options: Options = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  pool: {
    max: 50
  },
  logging: false
};
console.log(process.env);

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "quickmenu",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD,
  options
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connection to ${process.env.MYSQL_DATABASE} db has been established successfully.`
    );
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

export default sequelize;
