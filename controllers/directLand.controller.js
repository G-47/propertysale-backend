const mongoose = require("mongoose");
const DirectLand = mongoose.model("DirectLand");

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

module.exports.addDirectLand = (req, res) => {
  var directLand = new DirectLand({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    size: req.body.size,
    price: req.body.price,
    locationName: req.body.locationName,
    locationMap: req.body.locationMap,
    images: req.body.images,
    isFromOwner: req.body.isFromOwner,
    ownerId: req._id,
    status: req.body.status,
    postedTime: Date.now(),
  });

  directLand.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
      logdata(req,res,"Direct sale is posted by :" + req.user_id);
    }
  });
};

module.exports.allDirectLands = (req, res) => {
  DirectLand.find({ status: req.body.status }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.acceptDirectLand = (req, res) => {
  DirectLand.findByIdAndUpdate(
    req.body.id,
    { status: 1 },
    { new: true },
    (err, doc) => {
      if (err) {
        return res
          .status(404)
          .json({ status: false, message: "Record not found" });
      } else {
        res.send(doc);
        logdata(req,res,"Apporved direct land ad by : "+ req.user_id);
      }
    }
  );
};

module.exports.getLandsByUserId = (req, res) => {
  DirectLand.find({ ownerId: req._id }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getLandById = (req, res) => {
  DirectLand.findById(req.body.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
