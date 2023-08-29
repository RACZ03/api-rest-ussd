const { Sequelize } = require("sequelize");

const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "postgres",
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (e) {
    console.log("PostgreSQL ERROR connected", e);
  }
};

module.exports = { sequelize, dbConnection };
