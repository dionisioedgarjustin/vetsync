import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // set to true if you want to see SQL logs
  }
);

try {
  await sequelize.authenticate();
  console.log("Connected to PostgreSQL via Sequelize!");
} catch (error) {
  console.error("Database connection failed:", error);
}

export default sequelize;