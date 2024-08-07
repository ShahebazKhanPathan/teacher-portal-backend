const express = require("express");
const router = express.Router();
const { addStudent } = require("../controllers/student");

router.post("/", addStudent);

module.exports = router;