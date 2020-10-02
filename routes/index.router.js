const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const ctrlAuctionAd = require("../controllers/auctionAd.controller");
const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);

//MANAGER CONTROLLERS
router.get("/getAdmins",ctrlAdmin.allAdmins);

//AUCTION ADS CONTROLLERS
router.post("addAuctionAd",ctrlAuctionAd.insertAuctionAd);
router.get("getAllAds",ctrlAuctionAd.allAuctionAds);

module.exports = router;
