const { body } = require("express-validator");

module.exports = [
    body("user")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("The user name must have at least 5 characters"),
    body("email")
        .isEmail()
        .notEmpty()
        .withMessage("You must enter a valid email"),
    body("password")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("The password must have at least 5 characters")
];
