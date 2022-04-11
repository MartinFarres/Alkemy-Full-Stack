const { body } = require("express-validator");

module.exports = [
    body("concept")
        .notEmpty()
        .withMessage("The concept must be specified"),
    body("date")
        .notEmpty()
        .isDate()
        .withMessage("You must enter a valid date"),
    body("sum")
        .notEmpty()
        .withMessage("You must enter a valid sum"),
    body("type")
        .notEmpty() 
        .withMessage("The type must be specified"),
    body("category")
        .notEmpty()
        .withMessage("The category must be specified")
];