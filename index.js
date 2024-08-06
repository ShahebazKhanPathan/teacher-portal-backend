const express = require("express");
const app = express();

// Set port 
const PORT = process.env.PORT || 3000;

// Create node server
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));