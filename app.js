const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");

require("dotenv").config();

// Middleware
app.use(express.json());

app.use("/api/records", recordRoutes);

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Finance Backend Running 🚀");
});

module.exports = app;
