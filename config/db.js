// Import required modules
const mongoose = require("mongoose");
const config = require("config");

// Create mongodb connection
module.exports = () => {
    mongoose.connect(config.get("dbConfig.host"))
        .then(() => console.log("Node connected with MongoDB database."))
        .catch((err) => console.log(err.message));
}
