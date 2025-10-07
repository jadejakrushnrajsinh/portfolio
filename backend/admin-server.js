const express = require("express");
const app = express();

app.use(express.static("admin"));

app.listen(3001, () => console.log("Admin server running on port 3001"));
