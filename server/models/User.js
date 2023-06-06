const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const parkingSpot = require("./ParkingSpot");
const parkingRental = require("./ParkingRental");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  biography: {
    type: String,
  },
  rentalSpots: [{}],
  renteeSpots: [{}],
  history: [{}],
});

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
