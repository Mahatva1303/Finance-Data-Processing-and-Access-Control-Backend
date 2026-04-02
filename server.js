const express = require("express");
// const app = express();

const app = require("./app");
const connectDB = require("./config/db");


require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));