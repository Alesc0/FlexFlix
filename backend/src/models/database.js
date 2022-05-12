var Sequelize = require("sequelize");
const sequelize = new Sequelize("AI2", "postgres", "15Lucky04", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});
module.exports = sequelize;
