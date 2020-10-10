const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");

module.exports.register = (req, res, next) => {
  let user = new User();

  user.profilePicture = req.body.profilePicture;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.mobileNumber = req.body.mobileNumber;
  user.email = req.body.email;
  user.nicNumber = req.body.nicNumber;
  user.nicFrontImage = req.body.nicFrontImage;
  user.nicBackImage = req.body.nicBackImage;
  user.userType = req.body.userType;
  user.status = req.body.status;
  user.password = req.body.password;

  user.save((err, doc) => {
    if (err) {
      console.log("register error: " + JSON.stringify(err, undefined, 2));
      if (err.code == 11000) {
        res.status(422).send(["Duplicate email address found"]);
      }
    } else {
      res.send(doc);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // error from passport middleware
      return res.status(400).json(err);
    } else if (user) {
      // user is authenticated
      if (user.status == 1) {
        return res.status(200).json({ token: user.generateJwt() });
      } else {
        return res.status(404).json({ message: "user is not approved yet" });
      }
    } else {
      // unknown user or wrong password
      return res.status(404).json(info);
    }
  })(req, res);
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req._id, (err, doc) => {
    if (!err) {
      res.send({ user: doc });
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getUser = (req, res) => {
  User.findById(req.body.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getUsers = (req, res) => {
  User.find({ status: req.body.status }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.approveUser = (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    { status: 1 },
    { new: true },
    (err, doc) => {
      if (err) {
        return res
          .status(404)
          .json({ status: false, message: "Record not found" });
      } else {
        res.send(doc);
      }
    }
  );
};
