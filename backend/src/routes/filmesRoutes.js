const express = require("express");
const router = express.Router();

const filmesController = require("../controllers/filmesController");
router.get("/list", filmesController.list);
router.get("/get/:id", filmesController.detail);
router.post("/create", filmesController.create);
router.delete("/delete/:id", filmesController.delete);
router.put("/update/:id", filmesController.update);

router.get("/insertDefault", filmesController.insertDefault);

module.exports = router;
