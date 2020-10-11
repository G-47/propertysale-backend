const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
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

module.exports = router;
