const { Schema, model } = require("mongoose");
// /^[0-9]{5}(?:-[0-9]{4})?$/
//Zip code regex ^^
const ParkingSpotSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 256,
  },
  description: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 256,
  },
  owner: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  streetAddress: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 256,
    required: true,
  },
  zipcode: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 10,
    required: true,
    //Have a REGEX Verifier for zipcode
  },
  images: {
    type: String,
    //Not required to upload a pic.
  },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    //Defaulted to "true"
  },
  dateStart: {
    type: Date,
    required: true,
    //Start date  E.G: 06/05/2023
  },
  dateEnd: {
    type: Date,
    required: true,
    //End Date E.G.: 06/30/2023
  },
  Sunday: {
    type: Boolean,
  },
  Monday: {
    type: Boolean,
  },
  Tuesday: {
    type: Boolean,
  },
  Wednesday: {
    type: Boolean,
  },
  Thursday: {
    type: Boolean,
  },
  Friday: {
    type: Boolean,
  },
  Saturday: {
    type: Boolean,
  },
  //
});

const ParkingSpot = model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;
