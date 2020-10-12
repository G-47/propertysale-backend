const mongoose = require("mongoose");
const AuctionHouseAd = mongoose.model("AuctionHouseAd");
const Logger = mongoose.model("Logger");
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
      logdata(req, res, "Inserted ad for auction by :" + req.user_id);
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
    }
  });
};
module.exports.getAuctionHouseById = (req, res) => {
  AuctionHouseAd.findById(req.body.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
