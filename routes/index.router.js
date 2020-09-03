const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const ctrlAdmin = require("../controllers/admin.controller");
const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);

//MANAGER CONTROLLERS
router.get("/getAdmins",ctrlAdmin.allAdmins);
router.post("/postMessage",ctrlAdmin.postMessage);

module.exports = router;
