const express = require("express");
const router = express.Router();
const multer = require("multer");

let uuidv4 = require("uuid/v4");
const DIR = "./public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const filmesController = require("../controllers/filmesController");
router.get("/list", filmesController.list);
router.get("/get/:id", filmesController.detail);
router.post("/create", upload.single("file"), filmesController.create);
router.delete("/delete/:id", filmesController.delete);
router.put("/update/:id", upload.single("file"), filmesController.update);

router.get("/filter/", filmesController.filter);
//router.get("/insertDefault", filmesController.insertDefault);

module.exports = router;
