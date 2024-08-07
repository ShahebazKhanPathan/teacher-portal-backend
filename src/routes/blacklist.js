const express = require("express");
const router = express.Router();
const { checkTokenExpiry, blackListToken } = require("../controllers/blacklist");

router.get("/", checkTokenExpiry);
router.delete("/", blackListToken);

module.exports = router;