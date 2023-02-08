import * as dotenv from "dotenv";

dotenv.config({
  path: "config.env",
});
export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN!,
  DATABASE_HOST: process.env.DATABASE_HOST!,
  DATABASE_PORT: Number(process.env.DATABASE_PORT!),
  DATABASE_USERNAME: process.env.DATABASE_USERNAME!,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  DATABASE_NAME: process.env.DATABASE_NAME!,
};
