const { Schema, model } = require("mongoose");

const parkingSpot2Schema = new Schema({
  name: {
    type: String,
  },
});

const ParkingSpot2 = model("ParkingSpot2", parkingSpot2Schema);

module.exports = ParkingSpot2;
