const express = require("express");
const router = express.Router();
const { addStudent, getStudents, deleteStudent, updateStudent } = require("../controllers/student");

router.post("/", addStudent);
router.get("/", getStudents);
router.delete("/:id", deleteStudent);
router.put("/", updateStudent);

module.exports = router;