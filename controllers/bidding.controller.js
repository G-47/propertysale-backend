const mongoose = require("mongoose");
const Bidding = mongoose.model("Bidding");

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