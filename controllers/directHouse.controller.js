const mongoose = require("mongoose");
const DirectHouse = mongoose.model("DirectHouse");

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
    }
  });
};

module.exports.allDirectHouses = (req, res) => {
  directHouse.find({ status: req.body.status }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};
