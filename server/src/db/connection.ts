import mysql from "mysql2/promise";
import config from "../config/config";

export const pool = mysql.createPool({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USERNAME,
  port: config.DATABASE_PORT,
  database: config.DATABASE_NAME,
  password: config.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  multipleStatements: true,
});
