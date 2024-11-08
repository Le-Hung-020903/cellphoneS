require("dotenv").config();
const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DRIVER,
  DB_PORT,
  DB_USERNAME_PRODUCTION,
  DB_PASSWORD_PRODUCTION,
  DB_DATABASE_PRODUCTION,
  DB_DRIVER_PRODUCTION,
  DB_HOST_PRODUCTION,
  DB_PORT_PRODUCTION,
} = process.env;
const pg = require("pg");

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DRIVER,
    port: DB_PORT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DRIVER,
    port: DB_PORT,
  },
  production: {
    username: DB_USERNAME_PRODUCTION,
    password: DB_PASSWORD_PRODUCTION,
    database: DB_DATABASE_PRODUCTION,
    host: DB_HOST_PRODUCTION,
    dialect: DB_DRIVER_PRODUCTION,
    port: DB_PORT_PRODUCTION,
  },
  dialectModule: pg,
};
