const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const ctrlBidding = require("../controllers/bidding.controller");
const ctrlUser_Bidding = require("../controllers/user_bidding.controller");
const ctrlAuctionLandAd = require("../controllers/auctionLandAd.controller");
const ctrlAuctionHouseAd = require("../controllers/auctionHouseAd.controller");
const ctrlDirectLand = require("../controllers/directLand.controller");
const ctrlDirectHouse = require("../controllers/directHouse.controller");
const ctrlEmail = require("../controllers/email.controller");
const ctrlReport = require("../controllers/report.controller");

const jwtHelper = require("../config/jwtHelper");
const { verify } = require("jsonwebtoken");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);
router.get(
  "/getCurrentUser",
  jwtHelper.verifyJwtToken,
  ctrlUser.getCurrentUser
);
router.post("/getUser", ctrlUser.getUser);
router.post("/getUsers", jwtHelper.verifyJwtToken, ctrlUser.getUsers);
router.post("/approveUser", jwtHelper.verifyJwtToken, ctrlUser.approveUser);
router.put("/updateUser", jwtHelper.verifyJwtToken, ctrlUser.updateUser);

// DIRECT LAND/HOUSE CONTROLLERS

//LAND
router.post("/getDirectLands", ctrlDirectLand.allDirectLands);
router.post(
  "/addDirectLand",
  jwtHelper.verifyJwtToken,
  ctrlDirectLand.addDirectLand
);
router.put(
  "/acceptDirectLand",
  jwtHelper.verifyJwtToken,
  ctrlDirectLand.acceptDirectLand
);
router.get(
  "/getLandsByUserId",
  jwtHelper.verifyJwtToken,
  ctrlDirectLand.getLandsByUserId
);
router.post("/getLandById", ctrlDirectLand.getLandById);

//HOUSE
router.post("/getDirectHouses", ctrlDirectHouse.allDirectHouses);
router.post(
  "/addDirectHouse",
  jwtHelper.verifyJwtToken,
  ctrlDirectHouse.addDirectHouse
);
router.put(
  "/acceptDirectHouse",
  jwtHelper.verifyJwtToken,
  ctrlDirectHouse.acceptDirectHouse
);
router.get(
  "/getHousesByUserId",
  jwtHelper.verifyJwtToken,
  ctrlDirectHouse.getHousesByUserId
);
router.post("/getHouseById", ctrlDirectHouse.getHouseById);

//MANAGER CONTROLLERS
router.get("/getAdmins", jwtHelper.verifyJwtToken, ctrlAdmin.allAdmins);
router.post("/postMessage", jwtHelper.verifyJwtToken, ctrlAdmin.postMessage);
router.get("/getMessages", jwtHelper.verifyJwtToken, ctrlAdmin.getMessages);

router.post(
  "/postAuctionProperty",
  jwtHelper.verifyJwtToken,
  ctrlAdmin.postAuctionProperty
);
router.delete(
  "/removeAdmin/:id",
  jwtHelper.verifyJwtToken,
  ctrlAdmin.removeAdmin
);
router.get(
  "/getActivityLog",
  jwtHelper.verifyJwtToken,
  ctrlAdmin.getActivityLog
);

//EMAIL CONTROLLER
router.post("/sendEmail", ctrlEmail.send);

//REPORT CONTROLLER
router.post("/report", ctrlReport.create);

//AUCTION LAND ADS CONTROLLERS
router.post(
  "/addAuctionLandAd",
  jwtHelper.verifyJwtToken,
  ctrlAuctionLandAd.insertAuctionLandAd
);
router.get("/getAllLandAds", ctrlAuctionLandAd.allAuctionLandAds);
router.post("/getBidedLands", ctrlAuctionLandAd.getBidedLands);
router.get("/getEndedLandBids", ctrlAuctionLandAd.getEndedLandBids);
router.post("/getAuctionLandAdById", ctrlAuctionLandAd.getAuctionLandById);

//AUCTION HOUSE ADS CONTROLLER
router.post(
  "/addAuctionHouseAd",
  jwtHelper.verifyJwtToken,
  ctrlAuctionHouseAd.insertAuctionHouseAd
);
router.get("/getAllHouseAds", ctrlAuctionHouseAd.allAuctionHouseAds);
router.post("/getBidedHouses", ctrlAuctionHouseAd.getBidedHouses);
router.get("/getEndedHouseBids", ctrlAuctionHouseAd.getEndedHouseBids);
router.post("/getAuctionHouseAdById", ctrlAuctionHouseAd.getAuctionHouseById);

//BIDDING CONTROLLER
router.post("/insertBid", jwtHelper.verifyJwtToken, ctrlBidding.insertBid);
router.post(
  "/getAllBids",
  jwtHelper.verifyJwtToken,
  ctrlBidding.getAllBiddings
);

//USER_BIDDING CONTROLLER
router.post(
  "/insertData",
  jwtHelper.verifyJwtToken,
  ctrlUser_Bidding.insertData
);
router.post("/getData", jwtHelper.verifyJwtToken, ctrlUser_Bidding.getData);
router.post(
  "/getBidedPropertyIds",
  jwtHelper.verifyJwtToken,
  ctrlUser_Bidding.getBidedPropertyIds
);

module.exports = router;
