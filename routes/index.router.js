const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const ctrlDirectLand = require("../controllers/directLand.controller");
const ctrlDirectHouse = require("../controllers/directHouse.controller");
const ctrlEmail = require("../controllers/email.controller");

const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);
router.get("/getUser", jwtHelper.verifyJwtToken, ctrlUser.getUser);

// DIRECT LAND/HOUSE CONTROLLERS
router.post("/getDirectLands", ctrlDirectLand.allDirectLands);
router.post(
  "/addDirectLand",
  jwtHelper.verifyJwtToken,
  ctrlDirectLand.addDirectLand
);

router.post("/getDirectHouses", ctrlDirectHouse.allDirectHouses);
router.post(
  "/addDirectHouse",
  jwtHelper.verifyJwtToken,
  ctrlDirectHouse.addDirectHouse
);

//MANAGER CONTROLLERS
router.get("/getAdmins", jwtHelper.verifyJwtToken, ctrlAdmin.allAdmins);
router.post(
  "/registerAdmin",
  jwtHelper.verifyJwtToken,
  ctrlAdmin.registerAdmin
);
router.post("/postMessage", jwtHelper.verifyJwtToken, ctrlAdmin.postMessage);
router.post(
  "/postAuctionProperty",
  jwtHelper.verifyJwtToken,
  ctrlAdmin.postAuctionProperty
);

//EMAIL CONTROLLER
// router.post("/send", jwtHelper.verifyJwtToken, ctrlEmail.send);

router.post("/sendEmail", ctrlEmail.send);

module.exports = router;
