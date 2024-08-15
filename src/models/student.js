const mongoose = require("mongoose");

// Create student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    }
});

// Student details schema
const studentDetails = new mongoose.Schema({
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
    sId: mongoose.Schema.ObjectId
});

// Create student model
const Student = mongoose.model("Student", studentSchema);
const Details = mongoose.model("Details", studentDetails);

module.exports = { Student, Details };
