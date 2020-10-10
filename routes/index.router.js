const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const ctrlBidding = require("../controllers/bidding.controller");
const ctrlUser_Bidding = require("../controllers/user_bidding.controller");
const ctrlAuctionLandAd = require("../controllers/auctionLandAd.controller");
const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);

//MANAGER CONTROLLERS
router.get("/getAdmins",ctrlAdmin.allAdmins);

//AUCTION ADS CONTROLLERS
router.post("/addAuctionLandAd",ctrlAuctionLandAd.insertAuctionLandAd);
router.get("/getAllLandAds",ctrlAuctionLandAd.allAuctionLandAds);

//BIDDING
router.post("/insertBid",ctrlBidding.insertBid);
router.post("/getAllBids",ctrlBidding.getAllBiddings);

//USER_BIDDING
router.post("/insertData",ctrlUser_Bidding.insertData);
router.post("/getData",ctrlUser_Bidding.getData);

module.exports = router;
