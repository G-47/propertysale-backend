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
      return res.status(200).json({ token: user.generateJwt() });
    } else {
      // unknown user ow wrong password
      return res.status(404).json(info);
    }
  })(req, res);
};
