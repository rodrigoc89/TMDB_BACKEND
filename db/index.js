const Sequelize = require("sequelize");

const requiredEnvs = ["SECRET", "URL_DB", "DB_HOST"];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing env variable ${env}`);
  }
});

const dbConfig = {
  url: process.env.URL_DB,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
};

const db = new Sequelize(dbConfig.url, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

module.exports = db;
