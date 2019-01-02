const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create an mongodb schema for rental information
const userSchema = new Schema({
  username: {
    min: [4, "username too short"],
    max: [32, "username too long"],
    type: String,
    required: true
  },
  email: {
    min: [4, "username too short"],
    max: [32, "username too long"],
    type: String,
    required: "Email is required",
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    required: "Password is required"
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }]
  //bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
});

module.exports = mongoose.model("User", userSchema);
