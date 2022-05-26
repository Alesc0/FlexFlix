const { Op } = require("sequelize");
var filmes = require("../models/filmes");
const Genero = require("../models/generos");
var fs = require("fs");

const controllers = {};

const errorList = {
  titulo: "The title must be between 5 and 100 characters long!",
  descricao: "The description must be between 5 and 250 characters long!",
  foto: "The photo field is mandatory!",
  genre: "The Genre field is mandaroty!",
};

const validateAll = (body) => {
  let err = {};
  if (Object.keys(body).length === 0) return (err.erro = "No data received!");

  if (!body.titulo || body.titulo.length < 5 || body.titulo.length > 100) {
    err.titulo = errorList.titulo;
  }
  if (
    !body.descricao ||
    body.descricao.length < 5 ||
    body.descricao.length > 250
  ) {
    err.descricao = errorList.descricao;
  }
  if (!body.foto) {
    err.foto = errorList.foto;
  }
  if (!body.idgenero) {
    err.genre = errorList.genre;
  }
  return err;
};

controllers.list = async (req, res) => {
  const data = await filmes.findAll({
    include: [{ model: Genero }],
    raw: true,
    mapToModel: true,
    nest: true,
  });

  console.log("DATA =", data);

  res.json(data);
};

controllers.create = async (req, res) => {
  if (req.file) {
    const path = req.file.path.split("\\").pop();
    req.body.foto = path;
  }
  let err = validateAll(req.body);
  if (Object.keys(err).length != 0) {
    console.log("file deleted:", req.file.path);
    fs.unlinkSync(req.file.path);
    return res.status(400).send(err);
  }

  try {
    await filmes.create(req.body);
    res.status(200).send("Movie created with success!");
  } catch (err) {
    res.status(400).send(err);
  }
};

controllers.detail = async (req, res) => {
  try {
    const data = await filmes.findByPk(req.params.id, {
      raw: true,
      mapToModel: true,
      nest: true,
    });

    console.log("DATA =", data);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

controllers.filter = async (req, res) => {
  if (!req.query) return;

  try {
    const data = await filmes.findAll({
      where: {
        ...(req.query.id && {
          idfilme: req.query.id,
        }),
        ...(req.query.titulo && {
          titulo: {
            [Op.iLike]: "%" + req.query.titulo + "%",
          },
        }),
        ...(req.query.descricao && {
          descricao: {
            [Op.iLike]: "%" + req.query.descricao + "%",
          },
        }),
      },
      include: [{ model: Genero }],
      raw: true,
      mapToModel: true,
      nest: true,
    });

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

controllers.delete = async (req, res) => {
  try {
    await filmes.destroy({
      where: {
        idfilme: req.params.id,
      },
    });
    res.status(200).send("Movie deleted with success!");
  } catch {
    res.status(400).send(err);
  }
};

controllers.update = async (req, res) => {
  if (req.file) {
    const path = req.file.path.split("\\").pop();
    req.body.foto = path;
  }
  let err = validateAll(req.body);

  if (Object.keys(err).length != 0) {
    console.log("file deleted:", req.file.path);
    fs.unlinkSync(req.file.path);
    return res.status(400).send(err);
  }

  try {
    await filmes.update(req.body, {
      where: {
        idfilme: req.params.id,
      },
    });

    res.status(200).send("Movie updated with success!");
  } catch {
    res.status(400).send(err);
  }
};

controllers.insertDefault = async (req, res) => {
  try {
    await filmes.bulkCreate([
      {
        titulo: "Uncharted (2022)",
        descricao:
          'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.',
        foto: "https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg",
        idgenero: 1,
      },
      {
        titulo: "The Batman",
        descricao:
          "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        foto: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
        idgenero: 2,
      },
      {
        titulo: "Spider-Man: No Way Home (2021)",
        descricao:
          "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
        foto: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg",
        idgenero: 3,
      },
      {
        titulo: "The Godfather (1972)",
        descricao:
          "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
        foto: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        idgenero: 6,
      },
      {
        titulo: "The Shawshank Redemption (1994)",
        descricao:
          "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        foto: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        idgenero: 5,
      },
      {
        titulo: "The Dark Knight (2008)",
        descricao:
          "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        foto: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        idgenero: 2,
      },
      {
        titulo: "The Godfather: Part II (1974)",
        descricao:
          "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
        foto: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        idgenero: 6,
      },
      {
        titulo: "12 Angry Men (1957)",
        descricao:
          "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
        foto: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        idgenero: 6,
      },
      {
        titulo: "Schindler's List (1993)",
        descricao:
          "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        foto: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        idgenero: 7,
      },
      {
        titulo: "The Lord of the Rings: The Return of the King (2003)",
        descricao:
          "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        foto: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        idgenero: 3,
      },
      {
        titulo: "Pulp Fiction (1994)",
        descricao:
          "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        foto: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        idgenero: 6,
      },
    ]);
    console.log("OK");
  } catch (err) {
    console.log(err);
  }
};
module.exports = controllers;
