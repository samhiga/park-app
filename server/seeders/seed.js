const db = require("../config/connection");
const { User, ParkingSpot, ParkingRental } = require("../models");
const userSeeds = require("./userSeed.json");
const parkingSpotSeeds = require("./parkingSpotSeed.json");
const parkingRentalSeeds = require("./parkingRentalSeed.json");

db.once("open", async () => {
  try {
    await ParkingRental.deleteMany({});
    await ParkingSpot.deleteMany({});
    await User.deleteMany({});

    const users = await User.insertMany(userSeeds);
    const parkingspots = await ParkingSpot.insertMany(parkingSpotSeeds);
    const parkingrentals = await ParkingRental.insertMany(parkingRentalSeeds);

    //GO through our users
    for (newUser of users) {
      //get a random ID from our parkingspots
      const rentalparkSpot =
        parkingspots[Math.floor(Math.random() * parkingspots.length)];

      //Assign our owner of that rental spot as our user's ID.
      rentalparkSpot.owner = newUser._id;
      //save our rentalparkSpot's new owner.
      await rentalparkSpot.save();
      const renteeparkSpot =
        parkingspots[Math.floor(Math.random() * parkingspots.length)];

      const historyparkSpot =
        parkingrentals[Math.floor(Math.random() * parkingspots.length)];
      //add it to our user's rental spot
      newUser.rentalSpots.push(rentalparkSpot._id);
      newUser.renteeSpots.push(renteeparkSpot._id);
      newUser.history.push(historyparkSpot._id);
      await newUser.save();

      //GO through our parkingRental
      for (newUser of parkingrentals) {
        //Assign a random owner and rentee
        const tempOwner = users[Math.floor(Math.random() * users.length)];
        const tempRentee = users[Math.floor(Math.random() * users.length)];
        //add it to our parkingrental's owner and rentee
        newUser.owner = tempOwner._id;
        newUser.rentee = tempRentee._id;
        //save it.
        newUser.save();
      }

      //At the momenmt, the owners and rentees are completely random, so it won't make complete sense...
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
