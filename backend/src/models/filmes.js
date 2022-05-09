var Sequelize = require("sequelize");
var db = require("./database");

var Filme = db.define(
  "filmes",
  {
    idfilme: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: Sequelize.STRING,
    titulo: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Filme;
