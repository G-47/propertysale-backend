const mongoose = require("mongoose");
const Bidding = mongoose.model("Bidding");
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

module.exports.insertBid = (req, res) => {
    var bidding = new Bidding({
      adID: req.body.adID,
      userID: req.body.userID,
      biddingAmount: req.body.biddingAmount,
      type: req.body.type,      
      postedTime: Date.now()
    });
  
    bidding.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
        logdata(req,res,"New bid inserted by :" + req.body.userID);
      }
    });
  };
  
  module.exports.getAllBiddings = (req, res) => {
    Bidding.find({adID: req.body.adID},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    }).sort({biddingAmount: -1});
  };