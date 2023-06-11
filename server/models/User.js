const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    //Add Regex verification for password
  },
  email: {
    type: String,
    required: true,
    trim: true,
    //Add Regex verification for email
  },
  biography: {
    type: String,
  },
  rentalSpots: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingSpot",
    },
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: "ParkingRental",
    },
  ],
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
