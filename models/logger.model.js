const mongoose = require("mongoose");

var loggerSchema = new mongoose.Schema({
  endpoint: { type: String },
  req_ip: { type: String },
  timestamp: { type: Date },
  status_Code: { type: Number },
  method:{type:String},
  user_id:{type:String}
});

mongoose.model("Logger", loggerSchema);
