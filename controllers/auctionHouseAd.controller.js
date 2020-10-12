const mongoose = require("mongoose");
const AuctionHouseAd = mongoose.model("AuctionHouseAd");
console.log(Date.now());

module.exports.insertAuctionHouseAd = (req, res) => {
  var auctionHouseAd = new AuctionHouseAd({
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    locationName: req.body.locationName,
    locationMap: req.body.locationMap,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startBid: req.body.startBid,
    bedRooms: req.body.bedRooms,
    bathRooms: req.body.bathRooms,
    postedTime: Date.now(),
  });

  auctionHouseAd.save((err, doc) => {
    if (err) {
      console.log("insert error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  });
};

module.exports.allAuctionHouseAds = (req, res) => {
  AuctionHouseAd.find({ endDate: { $gt: Date.now() } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getBidedHouses = (req, res) => {
  AuctionHouseAd.find({ _id: { $in: req.body.ids } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getEndedHouseBids = (req, res) => {
  AuctionHouseAd.find({ endDate: { $lt: Date.now() } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
