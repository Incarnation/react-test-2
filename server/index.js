//import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const Rental = require("./models/rental");
const User = require("./models/user");
const rentalRoutes = require("./routes/rental");
const userRoutes = require("./routes/users");
const FakeDb = require("./fake-db");
const imageUploadRoute = require("./routes/image-upload");
const path = require("path");

//use the new parser
//new mongoose 5.4.2
//fix deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//connect to mongodb db
mongoose.connect(config.DB_URI).then(err => {
  //dev environment only
  if (process.env.NODE_ENV !== "production") {
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
  }
});

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
app.use("/api/v1/", imageUploadRoute);

//PRODUCTION SETTINGS------------------------------------
if (process.env.NODE_ENV === "production") {
  //located the build folder
  const appPath = path.join(__dirname, "..", "build");
  //get all the static content in the path
  app.use(express.static(appPath));
  //catch all the routes
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}
//PRODUCTION SETTINGS------------------------------------

//express tells node to listen to port 3001 or production port
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("node server is running");
});
