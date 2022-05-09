const controllers = {};
var generos = require("../models/generos");

controllers.list = async (req, res) => {
  const data = await generos.findAll();
  res.json(data);
};

controllers.create = async (req, res) => {
  try {
    await generos.create({
      descricao: req.body.descricao,
    });
    res.status(200).send("OK");
  } catch (err) {
    res.status(400).send(err);
  }
};

controllers.delete = async (req, res) => {
  try {
    await generos.destroy({
      where: {
        idgenero: req.params.id,
      },
    });
    res.status(200).send("OK");
  } catch {
    res.status(400).send("Err");
  }
};

controllers.update = async (req, res) => {
  try {
    await generos.update(req.body, {
      where: {
        idgenero: req.params.id,
      },
    });
    res.status(200).send("OK");
  } catch {
    res.status(400).send("Err");
  }
};

controllers.t = async (req, res) => {
  try {
    await await generos.bulkCreate([{ descricao: "Biografia" }]);
    res.status(200).send("OK");
  } catch {
    res.status(400).send("Err");
  }
};
controllers.insertDefault = async (req, res) => {
  try {
    await generos.bulkCreate([
      { descricao: "Comedy" },
      { descricao: "Action" },
      { descricao: "Adventure" },
      { descricao: "Animation" },
      { descricao: "Drama" },
      { descricao: "Crime" },
      { descricao: "Biography" },
    ]);
    console.log("OK");
  } catch (err) {
    console.log(err);
  }
};
module.exports = controllers;
