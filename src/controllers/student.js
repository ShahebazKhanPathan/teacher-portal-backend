const Joi = require("joi");
const Student = require("../models/student");

const addStudent = async (req, res, next) => {
    const { name, subject, marks } = req.body;

    // Validate student
    const { error } = validateStudent(name, subject, marks);
    if (error) return res.status(400).send(error.message);

    // Check if student already exists
    const isExist = await Student.findOne({ name: name, subject: subject });
    if (isExist) return res.status(409).send("Student already exists.");

    // Create student instance
    const student = new Student({
        name: name,
        subject: subject,
        marks: marks
    });

    // Save student
    const result = await student.save();
    if (result) return res.status(200).send("Student added successfully!");
}

// Function to validate student
function validateStudent(name, subject, marks) {

    // Create validation schema
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        subject: Joi.string().min(3).required(),
        marks: Joi.number().required()
    });

    return schema.validate({ name, subject, marks });
}

module.exports = { addStudent };