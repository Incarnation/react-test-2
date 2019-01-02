//import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const Rental = require("./models/rental");
const User = require("./models/user");
const rentalRoutes = require("./routes/rental");
const userRoutes = require("./routes/users");

//connect to mongodb db
mongoose.connect(
  config.DB_URI,
  { useNewUrlParser: true }
);

//DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//warning resolution
mongoose.set("useCreateIndex", true);

//create an express server
const app = express();

//use bodyParser middleware
app.use(bodyParser.json());

//apply middleware to routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);

//express tells node to listen to port 3001 or production port
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("node server is running");
});
