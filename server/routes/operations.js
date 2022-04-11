var express = require('express');
var router = express.Router();
var operationsController = require("../controllers/operationsController")
var operationsMiddleware = require("../middleware/operationsMiddleware")

/* GET home page. */
router.get("/", operationsController.getAll);
router.get("/:id", operationsController.detail);

router.post("/create", operationsMiddleware ,operationsController.create)

module.exports = router;
