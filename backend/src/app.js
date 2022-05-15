const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

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
app.use((req, res, next) => {
  const allowedOrigins = ["http://127.0.0.1:3001", "http://localhost:3001"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado na porta: " + app.get("port"));
});
