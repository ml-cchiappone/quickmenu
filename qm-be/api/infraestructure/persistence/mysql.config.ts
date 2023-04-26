import { Options, Sequelize } from "sequelize";
// import { env } from "process";

const env = {
  HOST_IP: "http://localhost:4200",
  SERVER_HOST: "http://localhost:4200",
  MYSQL_DATABASE: "quickmenu",
  MYSQL_USER: "root",
  MYSQL_PASSWORD: "root",
  MYSQL_PORT: 3306,
  MYSQL_HOST: "localhost"
};

const options: Options = {
  host: env.MYSQL_HOST,
  port: Number(env.MYSQL_PORT),
  dialect: "mysql",
  pool: {
    max: 50
  },
  logging: false
};

const sequelize = new Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  options
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Connection to ${env.MYSQL_DATABASE} db has been established successfully.`
    );
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

export default sequelize;
