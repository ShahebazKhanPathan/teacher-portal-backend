const Joi = require("joi");
const { Student, Details } = require("../models/student");

// Controller to add new student
const addStudent = async (req, res, next) => {
    try {
        const { name, subject, marks } = req.body;
    
        // Validate student
        const { error } = validateStudent(name, subject, marks);
        if (error) return res.status(400).send(error.message);
    
        // Check if student already exists
        const isExist = await Student.findOne({ name: name });
        if (isExist) {
            const details = await Details.findOne({ subject: subject });
            if (details) {
                // Update details
                const updateDetails = await Details.findOneAndUpdate({ subject: subject }, { marks: marks });
                if (updateDetails) return res.send("Details updated successfully.");
            }
            else {
                // Add new details
                const studentDetails = new Details({
                    sId: isExist._id,
                    subject: subject,
                    marks: marks
                });

                const saveDetails = await studentDetails.save();
                if (saveDetails) return res.send("Details added successfully.");
            }
        }
        else {
            // Create student instance
            const student = new Student({
                name: name
            });
        
            // Create details instance 
            const studentDetails = new Details({
                subject: subject,
                marks: marks
            });
        
            // Save student and details
            const studentSaved = await student.save();
            const detailsSaved = await studentDetails.save();
            if (studentSaved && detailsSaved) return res.status(200).send("New student added successfully!");
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

// Controller to fetch all students
const getStudents = async (req, res, next) => {
    const students = await Student.find();
    if (!students) return res.status(404).send("No records found.");
    res.send(students);
}

// Controller to update student
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

    return schema.validate({ name: name, subject: subject, marks: marks });
}

module.exports = { addStudent, getStudents, deleteStudent, updateStudent };