const mongoose = require("mongoose");
const User_bidding = mongoose.model("User_bidding");

module.exports.insertData = (req, res) => {
    var bidding = new Bidding({
      adID: req.body.adID,
      userID: req.body.userID
    });
  
    bidding.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.getData = (req, res) => {
    Bidding.find({adID: req.body.adID, userID: req.body.userID},(err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    }).sort({biddingAmount: -1});
  };