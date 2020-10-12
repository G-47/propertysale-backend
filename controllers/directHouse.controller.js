const mongoose = require("mongoose");
const DirectHouse = mongoose.model("DirectHouse");
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

module.exports.addDirectHouse = (req, res) => {
  var directHouse = new DirectHouse({
    title: req.body.title,
    description: req.body.description,
    bedRooms: req.body.bedRooms,
    bathRooms: req.body.bathRooms,
    price: req.body.price,
    locationName: req.body.locationName,
    locationMap: req.body.locationMap,
    images: req.body.images,
    isFromOwner: req.body.isFromOwner,
    ownerId: req._id,
    status: req.body.status,
    postedTime: Date.now(),
  });

  directHouse.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
      logdata(req,res,"Inserted direct sale ad by :" + req.user_id);
    }
  });
};

module.exports.allDirectHouses = (req, res) => {
  DirectHouse.find({ status: req.body.status }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.acceptDirectHouse = (req, res) => {
  DirectHouse.findByIdAndUpdate(
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
        logdata(req,res,"Approved direct sale by :" + req.user_id);
      }
    }
  );
};

module.exports.getHousesByUserId = (req, res) => {
  DirectHouse.find({ ownerId: req._id }, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};

module.exports.getHouseById = (req, res) => {
  DirectHouse.findById(req.body.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
