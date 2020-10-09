require("./config/config");
require("./db");
require("./config/userPassportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const rtxIndex = require("./routes/index.router");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", rtxIndex);

//error handler
app.use((err, req, res, next) => {
  if (err.name === "validationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  };
});

app.listen(process.env.PORT, () => {
  console.log("hello");
  console.log("Express Server started at port: " + process.env.PORT);
});
