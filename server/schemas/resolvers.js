// const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require("../utils/auth")
const { GraphQLScalarType, Kind } = require("graphql");
const { User, ParkingSpot, ParkingRental } = require("../models");
// make a query to find all of opur parking spots. homepage etc

//Function associated with the custom scalar.
// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
//Give credit to snippet in README.
//We got this from above
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
  Query: {
    //Finds all users
    // user: async (parent, { id }) => {
    //   // return User.find({});
    //   return User.findById(id);
    //   // return null;
    // },
    user: async () => {
      return await User.find({});
    },
    //Finds all parkingSpots
    parkingSpot: async () => {
      return await ParkingSpot.find({}).populate("owner");
    },
    //Finds all parkingRentals
    parkingRental: async (parent, { id }) => {
      return await ParkingRental.find({});
      // return ParkingRental.findById(id);
    },
    getSPP: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      console.log("Params is: ");
      console.log(params);
      return await ParkingSpot.findOne(params).populate("owner");
    },
    // Query user history
    // update the resolver for the me query to include the history field as well to ensure that the user's past parking spots are populated when querying the me field
    userPastParkingSpots: async (parent, args, context) => {
      const userId = context.user._id; // Assuming you have authentication implemented and the user is available in the context
      try {
        const user = await User.findById(userId).populate("history");
        return user.history; // Assuming the user's past parking spots are stored in the "history" field
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch user's past parking spots");
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        console.log("I got called")
        const user = await User.create({ username, email, password });
        console.log("User is: ");
        console.log(user);
        return user;
      } catch (err) {
        console.error(err);
      }
      //Implement once signToken is in.
      // const token = signToken(user)
    },
    createParkingSpot: async (
      parent,
      { name, owner, streetAddress, zipcode, price, active, dateStart, dateEnd }
    ) => {
      const parkingSpot = await ParkingSpot.create({
        name,
        owner,
        streetAddress,
        zipcode,
        price,
        active,
        dateStart,
        dateEnd,
      });
      return parkingSpot;
    },
    createParkingRental: async (parent, args) => {
      const parkingRental = await ParkingRental.create(args);
      return parkingRental;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        //REPLACE ME ONCE AUTHENTICATION ERRORS ARE IN!
        console.log("User not found!");
        // throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("Password is not correct!");
        // throw new AuthenticationError('Incorrect credentials');
      }
      //Use this once we're asble to sign tokens

      // const token = signToken(user);
      return { user };
      // return { token, user}
    },
  },

  //Can use mongoose's populate - which will populate.
  //Or can optimize by specifying down beneath.

  // User: {
  //   rentalSpots: async (parent, args, context, info) => {
  //     return ParkingSpot.find({ owner: parent.id });
  //   },
  //   renteeSpots: async (parent, args, context, info) => {
  //     return ParkingRental.find({ rentee: parent.id });
  //   },
  //   history: async (parent, args, context, info) => {
  //     // Implement logic to retrieve user's booking history
  //   },
  // },
  // ParkingSpot: {
  //   owner: async (parent, args, context, info) => {
  //     return User.findById(parent.owner);
  //   },
  // },
  // ParkingRental: {
  //   owner: async (parent, args, context, info) => {
  //     return User.findById(parent.owner);
  //   },
  //   rentee: async (parent, args, context, info) => {
  //     return User.findById(parent.rentee);
  //   },
  // },

  Date: dateScalar,
};

module.exports = resolvers;
