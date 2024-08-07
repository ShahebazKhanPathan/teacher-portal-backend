const Joi = require("joi");

// Controller for user login
const userLogin = async (req, res, next) => {
    const { id, password } = req.body;

    // Valdiate fields
    const { error } = validateUser(id, password);
    if (error) return res.status(400).send(error.message);
}

// Function to validate fields
function validateUser(id, password) {

    // Create schema
    const schema = Joi.object({
        id: Joi.string().min(3),
        password: Joi.string().min(8)
    });

    // Apply schema on fields
    return schema.validate({ id, password });
}

module.exports = { userLogin };