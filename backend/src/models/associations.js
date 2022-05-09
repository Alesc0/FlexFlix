const Filmes = require("./filmes");
const Generos = require("./generos");

Generos.hasMany(Filmes, { foreignKey: "idgenero", allowNull: false });
Filmes.belongsTo(Generos, { foreignKey: "idgenero", allowNull: false });
