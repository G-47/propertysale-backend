const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  adminId: { type: String },
  name: { type: String },
  message: { type: String },
  timestamp: { type: Number },
});

mongoose.model("Message", messageSchema);
