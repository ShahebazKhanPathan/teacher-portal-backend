// Import required modules
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

// Controller for user login
const userLogin = async (req, res, next) => {
    const { id, password } = req.body;

    // Validate fields
    const { error } = validateUser(id, password);
    if (error) return res.status(400).send(error.message);

    // Authenticate user
    const authenticity = authenticateUser(id, password);
    if (!authenticity) return res.status(404).send("Invalid credentials");

    // Create a JWT token
    const token = jwt.sign({ id: config.get("adminConfig.adminId") }, config.get("privateKey"));
    if (token) res.status(200).send(token);
}

// Function to validate fields
function validateUser(id, password) {

    // Create a schema
    const schema = Joi.object({
        id: Joi.string().min(3),
        password: Joi.string().min(8)
    });

    // Apply schema on fields
    return schema.validate({ id, password });
}

// Function to authenticate a user
function authenticateUser(id, password) {
    const userId = config.get("adminConfig.adminId");
    const userPassword = config.get("adminConfig.adminPassword");

    if (userId == id && userPassword == password) return true;
    return false;
}

module.exports = { userLogin };