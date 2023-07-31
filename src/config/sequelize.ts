// import * as Sequelize from 'sequelize'
import { Sequelize } from "sequelize";
import { dbConfig } from "./dbConfig";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export const verifyDBConnection = async () => {
  // Verify Database connection
  return await sequelize.authenticate();
};
