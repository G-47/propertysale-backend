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
    isFromOwner: req.body.isFromOwner,
    ownerId: req._id,
    status: req.body.status,
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
  directHouse.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};