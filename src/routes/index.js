var router = require("express").Router();
var { addLecturer, addParent, addStudent } = require("../middlewares/index");

router.get("/", function (req, res, next) {
  res.send("Welcome to the API");
});

router.post("/addLecturer", addLecturer);

router.post("/addParent", addParent);

router.post("/addStudent", addStudent);

module.exports = router;
