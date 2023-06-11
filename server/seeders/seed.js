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

    //Users must have a rentalSpot and a History of Parking Rental IDs.
    //Parking Spots must have a Owner that matches with a user's rentalspot array.
    //Parking Rentals should have a random owner ID and a random rentee ID

    //GO through our users
    for (newUser of users) {
      //get a random ID from our parkingspots

      const randomParkingSpot =
        parkingspots[Math.floor(Math.random() * parkingspots.length)];
      //If the user doesn't have that parking spot, push it.

      if (!newUser.rentalSpots.includes(randomParkingSpot._id)) {
        randomParkingSpot.owner = newUser._id;
        await randomParkingSpot.save();
        newUser.rentalSpots.push(randomParkingSpot._id);
        await newUser.save();
      }

      //OKay, now our spot has a random user attached to it. Take our spot's ID and push it to user's rentalSpots.
    }
    // Go through each parking spot. Then go through the user array.
    //If there is no match, assign it to whoever is left over.
    for (const newParkingSpot of parkingspots) {
      //I want to make sure every parking spot is hooked up to a user
      let matchDetected = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].rentalSpots.includes(newParkingSpot._id)) {
          matchDetected = true;
          console.log("Match detected!");
        }
      }
      if (!matchDetected) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        newParkingSpot.owner = randomUser._id;
        await newParkingSpot.save();
        randomUser.rentalSpots.push(newParkingSpot._id);
        await randomUser.save();
        console.log("random user and newparkingspot: ");
        console.log(randomUser);
        console.log(newParkingSpot);
      }
    }
    //Randomly assign users to our parking rentals,
    //Also push them to our history.

    for (const session of parkingrentals) {
      let randomUser1 = users[Math.floor(Math.random() * users.length)];
      let randomUser2 = users[Math.floor(Math.random() * users.length)];
      session.owner = randomUser1._id;
      randomUser1.history.push(session._id);
      await randomUser1.save();

      randomUser2.history.push(session._id);
      await randomUser2.save();
      session.rentee = randomUser2._id;
      await session.save();
    }

    //Now I need to create sessions, that are connected with users connected with random users.

    //Go through our sessions.
    //Pick two random users.
    // assign their IDs to that session.
    //Assign that session to both their historys.
    //randomize whether active should be true or false.

    //I only want to push a parkingSpot to a random user if no matches were found at all in any of the users.
    //If a match was found in any of the users, we leave it.
    console.log(parkingrentals);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
