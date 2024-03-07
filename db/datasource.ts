import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../src/users/entities/user.entity";
import path from "path";
dotenv.config();

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: [path.join(__dirname, "../*/**/*.entity.{js,ts}")],
  migrations: [path.join(__dirname, "/migration/*.{ts,js}")],
  synchronize: false,
});
