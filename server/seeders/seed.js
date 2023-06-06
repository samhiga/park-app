const db = require("../config/connection");
const { User, ParkingSpot, ParkingRental } = require("../models");
const userSeeds = require("./userSeeds.json");
const parkingSpotSeeds = require("./parkingSpotSeeds.json");
const parkingRentalSeeds = require("./parkingRentalSeeds.json");

db.once("open", async () => {
  try {
    await ParkingRental.deleteMany({});
    await ParkingSpot.deleteMany({});
    await User.deleteMany({});

    await ParkingSpot.create(parkingSpotSeeds);
    await User.create(userSeeds);

    for (let i = 0; i < parkingRentalSeeds.length; i++) {
      const { _id, owner } = await ParkingRental.create(parkingRentalSeeds[i]);
      const parkingSpot = await ParkingSpot.findOneAndUpdate(
        { owner: owner },
        {
          $addToSet: {
            rentals: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
