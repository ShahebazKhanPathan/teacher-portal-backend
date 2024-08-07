const express = require("express");
const router = express.Router();

router.get("/", checkTokenExpiry);
router.delete("/", blackListToken);

module.exports = router;