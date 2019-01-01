//import express from "express";
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");

//console.log(config.DB_URI);

mongoose.connect(config.DB_URI);

//create an express server
const app = express();

//create route handler
app.get("/rentals", (req, res) => {
  res.send({ hi: "there" });
});

//express tells node to listen to port 3001 or production port
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("node server is running");
});
