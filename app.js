var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var logger = require("morgan");

var router = require("./src/routes/index");

var port = process.env.PORT || 3000;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
