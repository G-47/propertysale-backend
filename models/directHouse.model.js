const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var directHouseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  bedRooms: {
    type: Number,
  },
  bathRooms: {
    type: Number,
  },
  price: {
    type: Number,
  },
  locationName: {
    type: String,
  },
  locationMap: {
    type: {
        lat: Number,
        lang: Number
    },
  },
  isFromOwner: {
      type: Boolean ,
  },
  ownerId: {
      type: String
  },
  status: {
    type: Number
  }
});


mongoose.model("DirectHouse", directHouseSchema);
