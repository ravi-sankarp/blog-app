import mysql from "mysql2/promise";
import config from "../../config/config";

const initialSetup = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DATABASE_HOST,
      user: config.DATABASE_USERNAME,
      port:config.DATABASE_PORT,
      password: config.DATABASE_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
    });
    console.log("Connected to database");
    await connection.query("CREATE DATABASE IF NOT EXISTS blog_app;");
    await connection.query(" USE blog_app;");

    // creating user table to store all the user details
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users(
         id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
         userName VARCHAR(20) NOT NULL UNIQUE,
         firstName VARCHAR(20) NOT NULL,
         lastName VARCHAR(20) NOT NULL,
         email VARCHAR(30) UNIQUE NOT NULL,
         phoneNumber VARCHAR(15) NOT NULL,
         password VARCHAR(70) NOT NULL,
         admin BOOLEAN NOT NULL DEFAULT false,
         passwordChangedOn DATETIME DEFAULT NULL,
         createdOn DATETIME NOT NULL DEFAULT NOW()
    );
  `);

    console.log("Successfully ran all the migrations");
    connection.end();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

initialSetup();
