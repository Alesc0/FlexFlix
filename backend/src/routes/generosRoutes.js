const express = require("express");
const router = express.Router();

const generosController = require("../controllers/generosController");
router.get("/list", generosController.list);
router.post("/create", generosController.create);
router.delete("/delete/:id", generosController.delete);
router.put("/update/:id", generosController.update);
router.get("/t", generosController.t);


router.get("/insertDefault", generosController.insertDefault);
module.exports = router;
