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
    unique: true,
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
  // images: {
  //   type: Buffer,
  //   // https://mongoosejs.com/docs/schematypes.html#buffers
  // },
  price: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
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
  sunday: {
    type: Boolean,
    default: true,
  },
  monday: {
    type: Boolean,
    default: true,
  },
  tuesday: {
    type: Boolean,
    default: true,
  },
  wednesday: {
    type: Boolean,
    default: true,
  },
  thursday: {
    type: Boolean,
    default: true,
  },
  friday: {
    type: Boolean,
    default: true,
  },
  saturday: {
    type: Boolean,
    default: true,
  },
  //
});

const ParkingSpot = model("ParkingSpot", ParkingSpotSchema);

module.exports = ParkingSpot;
