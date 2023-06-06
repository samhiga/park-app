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
  },
  images: {
    //Figure out how to insert images
  },
  price: {
    type: Double,
    required: true,
  },
  active: {
    type: Boolean,
  },
  datesAvailable: {
    type: String,
    //Start date to end date: E.G: 06/05/2023-06/30/2023
    //so a STRING?
  },
  datesUnavailable: [
    {},
    // {
    //   Sunday: True,
    //   Monday: True,
    //   Tuesday: True,
    //   Wednesday: True,
    //   Thursday: True,
    //   Friday: True,
    //   Saturday: True,
    // },
  ],
});

const ParkingSpot = model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;
