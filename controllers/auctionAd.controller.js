const mongoose = require("mongoose");
const AuctionAd = mongoose.model("AuctionAds");

module.exports.insertAuctionAd = (req, res) => {
    var auctionAd = new AuctionAd({
      name: req.body.name,
      type:req.body.type,
      size:req.body.size,
      description:req.body.description,
      threeSixtyImageUrl:req.body.threeSixtyImageUrl,
      extracts:req.body.extracts,
      otherImages:req.body.otherImages,
      mapCordinates:req.body.mapCordinates,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      startBid:req.body.startBid
    });
  
    auctionAd.save((err, doc) => {
      if (err) {
        console.log("insert error: " + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  };
  
  module.exports.allAuctionAds = (req, res) => {
    AuctionAd.find((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    });
  };