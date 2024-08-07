const Joi = require("joi");
const Student = require("../models/student");

// Controller to add new student
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

// Controller to fetch all students
const getStudents = async (req, res, next) => {
    const students = await Student.find();
    if (!students) return res.status(404).send("No records found.");
    res.send(students);
}

const updateStudent = async (req, res, next) => {
    const { name, subject, marks, id } = req.body;
    const update = await Student.findByIdAndUpdate(id, { name: name, subject: subject, marks: marks });
    if (update) return res.status(200).send("Student updated successfully!");
    res.status(409).send("Update failed.");
}

// Controller to delete a student
const deleteStudent = async (req, res, next) => {
    const id = req.params.id;
    const result = await Student.deleteOne({ _id: id });
    if (!result) return res.status(404).send("Invalid ID");
    res.status(200).send("Student deleted successfully!");
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

module.exports = { addStudent, getStudents, deleteStudent, updateStudent };