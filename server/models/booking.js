const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//models for booking
const bookingSchema = new Schema({
  startAt: { type: Date, required: "Starting date is required" },
  endAt: { type: Date, required: "Ending date is required" },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rental: { type: Schema.Types.ObjectId, ref: "Rental" },
  contactNumber: { type: String },
  contactName: { type: String },
  viewDate: { type: Date, required: "viewing date is required" },
  confirmation: { type: Boolean }
});

module.exports = mongoose.model("Booking", bookingSchema);
