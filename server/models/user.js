const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

//compare the entered password with the user's password
userSchema.methods.hasSamePassword = function(pw) {
  return bcrypt.compareSync(pw, this.password);
};

//this function is called before the user is save to the database
//hasing the passwords
userSchema.pre("save", function(next) {
  const user = this;
  const saltRounds = 9;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
