const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");

module.exports.registerAdmin = (req, res) => {
  var admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
  });

  admin.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  });
};

module.exports.allAdmins = (req, res) => {
  Admin.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
