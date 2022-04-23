var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var operationsRouter = require("./routes/operations");
var usersRouter = require("./routes/users");
var refreshRouter = require("./routes/refresh");
var cors = require("cors");
var corsOptions = require("./config/corsOptions");
var verifyJWT = require("./middleware/verifyJWT");
var credentials = require("./middleware/credentials");
var app = express();

app.listen(process.env.PORT || 3001, () => console.log("Esto fue exitoso"));

app.use(credentials);

app.use(cors(corsOptions));

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/refresh", refreshRouter);
app.use(verifyJWT);
app.use("/operations", operationsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
