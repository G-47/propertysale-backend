const mongoose = require("mongoose");
const User_bidding = mongoose.model("User_bidding");
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

module.exports.insertData = (req, res) => {
  var user_bidding = new User_bidding({
    adID: req.body.adID,
    userID: req.body.userID,
    type: req.body.type,
  });

  user_bidding.save((err, doc) => {
    if (err) {
      console.log("insert error: " + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
      logdata(req,res,"Inserted new bid by : "+ req.user_id);
    }
  });
};

module.exports.getData = (req, res) => {
  User_bidding.find(
    { adID: req.body.adID, userID: req.body.userID },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    }
  );
};

module.exports.getBidedPropertyIds = (req, res) => {
  User_bidding.find(
    { userID: req._id, type: req.body.type },
    { adID: 1, _id: 0 },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.send("Error in retrieving: " + JSON.stringify(err, undefined, 2));
      }
    }
  );
};
