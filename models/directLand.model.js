const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var directLandSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
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
      lng: Number,
    },
  },
  images: {
    type: Array,
  },
  isFromOwner: {
    type: Boolean,
  },
  ownerId: {
    type: String,
  },
  status: {
    type: Number,
  },
  postedTime: {
    type: Number,
  },
});

mongoose.model("DirectLand", directLandSchema);
