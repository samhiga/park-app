const { Schema, model } = require("mongoose");

const ParkingRentalSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  rentee: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },
  dateBookedStart: {
    type: Date,
    required: true,
  },
  dateBookedEnd: {
    type: Date,
    required: true,
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

const ParkingRental = model("ParkingRental", ParkingRentalSchema);

module.exports = ParkingRental;
