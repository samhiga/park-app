const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const { User, ParkingSpot, ParkingRental } = require("../models");
const { signToken } = require("../utils/auth");
// make a query to find all of opur parking spots. homepage etc

//Function associated with the custom scalar.
// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
//Give credit to snippet in README.
//We got this from above

//?do we need this?
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
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
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
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        console.log("I got called");
        const user = await User.create({ username, email, password });
        const token = signToken(user); // generate token for the created user
        console.log("User is: ");
        console.log(user);
        return { token, user }; // Include token in the response
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
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user); // Generate token for the authenticated user
      return { token, user }; // Include token in the response
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
