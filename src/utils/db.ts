import mysql, { PoolOptions } from "mysql2";
import "dotenv/config";

const host = process.env.HOST;
const user = process.env.USER;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;

const access: PoolOptions = {
  host,
  user,
  database,
  password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const conn = mysql.createPool(access);
export default conn;
