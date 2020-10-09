const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  nicNumber: {
    type: String,
  },
  nicFrontImage: {
    type: String,
  },
  nicBackImage: {
    type: String,
  },
  userType: {
    type: Number,
  },
  status: {
    type: Number,
  },
  password: {
    type: String,
  },
  saltSecret: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          this.password = hash;
          this.saltSecret = salt;
          next();
        }
      });
    }
  });
});

// Methods
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("User", userSchema);
