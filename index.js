// Import required modules
const express = require("express");
const cors = require("cors");
const error = require("./middleware/error");
const user = require("./src/routes/user");
const student = require("./src/routes/student");
const blacklist = require("./src/routes/blacklist");

// Create express application
const app = express();

// Create database connection
require("./config/db")()

// Set PORT 
const PORT = process.env.PORT || 3000;

// Enable CORS to allow cross origin requests
app.use(cors());

// Enable JSON body request parsing
app.use(express.json());

// Enable routes
app.use("/api/user", user);
app.use("/api/student", student);
app.use("/api/blacklist", blacklist);

// Enable error middleware
app.use(error);

// Create node server
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}.`));