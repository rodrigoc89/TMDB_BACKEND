require("dotenv").config({ path: "./.env" });

const requiredEnvs = ["SECRET", "URL_DB", "DB_HOST"];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    console.warn(`Warning: Missing environment variable '${env}'`);
  }
});

module.exports = process.env;
