const mongoose = require("mongoose");
const AuctionLandAd = mongoose.model("AuctionLandAd");
console.log(Date.now());

module.exports.insertAuctionLandAd = (req, res) => {
  var auctionLandAd = new AuctionLandAd({
    title: req.body.title,
    type: req.body.type,
    size: req.body.size,
    description: req.body.description,
    threeSixtyImageUrl: req.body.threeSixtyImageUrl,
    images: req.body.images,
    locationName: req.body.locationName,
    locationMap: req.body.locationMap,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startBid: req.body.startBid,
    currentBid: req.body.currentBid,
    postedTime: Date.now(),
  });

  auctionLandAd.save((err, doc) => {
    if (err) {
      console.log("insert error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  });
};

module.exports.allAuctionLandAds = (req, res) => {
  AuctionLandAd.find({ endDate: { $gt: Date.now() } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getBidedLands = (req, res) => {
  AuctionLandAd.find({ _id: { $in: req.body.ids } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
