var express = require("express");
var router = express.Router();
var operationsController = require("../controllers/operationsController");
var operationsMiddleware = require("../middleware/operationsMiddleware");

/* GET home page. */
router.get("/", operationsController.getAll);
router.get("/:id", operationsController.detail);
router.get("/getList/:id", operationsController.getUserList);

router.post("/create", operationsController.create);
router.put("/:id", operationsController.edit);
router.delete("/:id", operationsController.delete);
module.exports = router;
