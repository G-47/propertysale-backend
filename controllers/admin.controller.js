const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const Message = mongoose.model("Message");

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

module.exports.postMessage = (req, res) => {
  var message = new Message({
    adminId: req.body.adminId,
    name: req.body.name,
    message: req.body.message,
  });

  message.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  });
};
