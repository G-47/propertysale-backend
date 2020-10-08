const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const Message = mongoose.model("Message");
const NewAuction = mongoose.model("NewAuction");
const Logger = mongoose.model("Logger");

function logdata(req, res) {
  var log = new Logger({
    endpoint: req.url,
    req_ip: req.connection.remoteAddress,
    timestamp: Date.now(),
    status_code: res.statusCode,
    method:req.method,
    user_id:req._id,
  });
  log.save((err, doc) => {
    if (err) {
      res.send(doc);
    } else {
    }
  });
}

//register a admin
module.exports.registerAdmin = (req, res) => {
  var admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
  });

  admin.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      logdata(req, res);
      res.send(doc);
    }
  });
};

//get all  admins
module.exports.allAdmins = (req, res) => {
  Admin.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
    }
  });
  console.log(req.url, req.ip, res.statusCode, Date.now());
};

//send messages to admin
module.exports.postMessage = (req, res) => {
  var message = new Message({
    adminId: req.body.adminId,
    name: req.body.name,
    message: req.body.message,
  });

  message.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      console.log(req);
      logdata(req, res);
      res.send(doc);
    }
  });
};

// Post a property for a new auction

module.exports.postAuctionProperty = (req, res) => {
  var property = new NewAuction({
    title: req.body.title,
    startBid: req.body.startBid,
    interval: req.body.interval,
    size: req.body.size,
    propertyType: req.body.propertyType,
    location: req.body.location,
    description: req.body.description,
    image: req.body.image,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    currentBid: req.body.currentBid,
    currentBidHolder: req.body.currentBidHolder,
    status: "pending",
  });

  property.save((err, doc) => {
    if (err) {
      console.log("add error: " + JSON.stringify(err, undefined, 2));
    } else {
      logdata(req, res);
      res.send(doc);
    }
  });
};

module.exports.removeAdmin = (req, res) => {
  Admin.findByIdAndDelete(req.params.id, (err, docs) => {
    if (docs) {
      if (!err) {
        logdata(req, res);
        return res.send(docs);
      } else {
        return res
          .status(404)
          .json({ status: false, message: "not found admin" });
      }
    } else {
      return res
        .status(404)
        .json({ status: false, message: "not found admin" });
    }
  });
};
