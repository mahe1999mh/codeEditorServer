const express = require("express");
const {registerUser, signin} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", signin);

module.exports = router;
