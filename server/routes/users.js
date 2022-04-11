var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var registerMiddleware = require("../middleware/registerMiddleware");

/* GET users listing. */
router.get("/", userController.getAll);
router.get("/:id", userController.detail);

router.post("/register", registerMiddleware, userController.create);
router.post("/login", userController.login);
module.exports = router;
