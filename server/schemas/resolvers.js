const { User, ParkingSpot, ParkingSpotRental } = require('../models');

// make a query to find all of opur parking spots. homepage etc

const resolvers = {
  Query: {
    user: async (parent, { id }) => {
      return User.findById(id);
    },
    parkingSpot: async (parent, { id }) => {
      return ParkingSpot.findById(id);
    },
    parkingSpotRental: async (parent, { id }) => {
      return ParkingSpotRental.findById(id);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    createParkingSpot: async (parent, args) => {
      const parkingSpot = await ParkingSpot.create(args);
      return parkingSpot;
    },
    createParkingSpotRental: async (parent, args) => {
      const parkingSpotRental = await ParkingSpotRental.create(args);
      return parkingSpotRental;
    },
  },
  User: {
    rentalSpots: async (parent, args, context, info) => {
      return ParkingSpot.find({ owner: parent.id });
    },
    renteeSpots: async (parent, args, context, info) => {
      return ParkingSpotRental.find({ rentee: parent.id });
    },
    history: async (parent, args, context, info) => {
      // Implement logic to retrieve user's booking history
    },
  },
  ParkingSpot: {
    owner: async (parent, args, context, info) => {
      return User.findById(parent.owner);
    },
  },
  ParkingSpotRental: {
    owner: async (parent, args, context, info) => {
      return User.findById(parent.owner);
    },
    rentee: async (parent, args, context, info) => {
      return User.findById(parent.rentee);
    },
  },
};

module.exports = resolvers;
