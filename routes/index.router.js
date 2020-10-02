const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);

//MANAGER CONTROLLERS
router.get("/getAdmins",jwtHelper.verifyJwtToken,ctrlAdmin.allAdmins);
router.post("/registerAdmin",jwtHelper.verifyJwtToken,ctrlAdmin.registerAdmin);
router.post("/postMessage",jwtHelper.verifyJwtToken,ctrlAdmin.postMessage);
router.post("/postAuctionProperty",jwtHelper.verifyJwtToken,ctrlAdmin.postAuctionProperty)

module.exports = router;
