const mongoose = require("mongoose");
const AuctionLandAd = mongoose.model("AuctionLandAd");
console.log(Date.now());

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
      logdata(req,res,"Inserted ad for auction by :" + req.user_id);
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
  console.log("xxxxxxxxxxxxxx");
  console.log(req.body);
  AuctionLandAd.find({ _id: { $in: req.body.ids } }, (err, docs) => {
    if (!err) {
      res.send(docs);
      console.log(docs);
    } else {
      console.log("error");
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getEndedLandBids = (req, res) => {
  AuctionLandAd.find({ endDate: { $lt: Date.now() } }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
