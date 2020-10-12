// const express = require("express");
// const bodyParser = require("body-parser");
// const exhbs = require("express-handlebars");
// const path = require("path");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Logger = mongoose.model("Logger");

function logdata(req, res, msg) {
  var log = new Logger({
    endpoint: req.url,
    req_ip: req.connection.remoteAddress,
    timestamp: Date.now(),
    status_code: res.statusCode,
    method: req.method,
    user_id: req._id,
    message: msg,
  });
  log.save((err, doc) => {
    if (err) {
      res.send(doc);
    } else {
    }
  });
}


// const app = express();

// app.engine("handlebars", exhbs());
// app.set("view engine", "handlebars");

// app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.render("contact");
// });

module.exports.send = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lankaproperties47@gmail.com",
      pass: "Lanka@123",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOption = {
    from: '"nodemailer" , <lankaproperties47@gmail.com>',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      res.send({ error: "Email has not been sent..." });
      return console.log(error);
    } else {
      res.send({ msg: "Email has been sent..." });
      logdata(req,res,"Email is sent to :" + req.body.email + "by : " + req.user_id);

    }
    console.log("email has been sent");
  });
};

// app.listen(3000, () => {
//   console.log("server started ...");
// });
