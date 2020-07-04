const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

// USER CONTROLLERS
router.post("/registerUser", ctrlUser.register);
router.post("/authenticateUser", ctrlUser.authenticate);

module.exports = router;