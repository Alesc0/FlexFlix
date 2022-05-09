var Sequelize = require("sequelize");
var db = require("./database");

var Genero = db.define(
  "generos",
  {
    idgenero: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Genero;
