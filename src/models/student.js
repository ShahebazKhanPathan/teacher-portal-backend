const mongoose = require("mongoose");

// Create student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    subject: {
        type: String,
        required: true,
        minlength: 3,
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
    },
});

// Create student model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
