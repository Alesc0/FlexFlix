const express = require("express");
const app = express();
var db = require("./models/database");

const generosRoutes = require("./routes/generosRoutes.js");
const filmesRoutes = require("./routes/filmesRoutes.js");
const filmesController = require("./controllers/filmesController");
const generosController = require("./controllers/generosController");
require("./models/associations");
//configurações
app.set("port", process.env.port || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/genero", generosRoutes);
app.use("/filme", filmesRoutes);
app.use("/setup", async () => {
  await generosController.insertDefault();
  await filmesController.insertDefault();
});

db.sync();

app.listen(app.get("port"), () => {
  console.log("Servidor iniciado na porta: " + app.get("port"));
});
