const mongoose = require("mongoose");
const DirectLand = mongoose.model("DirectLand");

module.exports.addDirectLand = (req, res) => {
  var directLand = new DirectLand({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    size: req.body.size,
    price: req.body.price,
    locationName: req.body.locationName,
    locationMap: req.body.locationMap,
    isFromOwner: req.body.isFromOwner,
    ownerId: req._id,
    status: req.body.status,
  });

  directLand.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  });
};

module.exports.allDirectLands = (req, res) => {
  DirectLand.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
};