const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { GraphQLScalarType, Kind } = require("graphql");
const { User, ParkingSpot, ParkingRental } = require("../models");
// make a query to find all of opur parking spots. homepage etc

//Function associated with the custom scalar.
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
    user: async () => {
      return await User.find({})
        .populate({
          path: "rentalSpots",
          model: "ParkingSpot",
        })
        .populate({
          path: "history",
          model: "ParkingRental",
          populate: [
            {
              path: "owner",
              model: "User",
              select: "username",
            },
            {
              path: "rentee",
              model: "User",
              select: "username",
            },
          ],
        })
        .exec();
    },
    //Finds all parkingSpots
    parkingSpot: async () => {
      return await ParkingSpot.find({}).populate("owner");
    },
    //Finds all parkingRentals
    parkingRental: async () => {
      return await ParkingRental.find({})
        .populate({
          path: "owner",
          select: "username",
        })
        .populate("rentee");
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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("history");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error(err);
      }
      //Implement once signToken is in.
      // const token = signToken(user)
    },
    createParkingSpot: async (
      parent,
      {
        name,
        streetAddress,
        zipcode,
        price,
        dateStart,
        description,
        dateEnd,
        owner,
      }
    ) => {
      try {
        console.log("Creating parking spot on the backend.");
        const parkingSpot = await ParkingSpot.create({
          name,
          streetAddress,
          zipcode,
          price,
          dateStart,
          description,
          dateEnd,
          owner,
        });
        console.log("parkingSpot is: ");
        console.log(parkingSpot);
        return parkingSpot;
      } catch (err) {
        console.log(
          "oh no! we error'd on the server side for creating a parking spot!"
        );
        console.error(err);
      }
    },
    createParkingRental: async (
      parent,
      { owner, rentee, dateBookedStart, dateBookedEnd, pricePaid, active }
    ) => {
      try {
        console.log("Creating rental session.");
        const parkingRental = await ParkingRental.create({
          owner,
          rentee,
          dateBookedStart,
          dateBookedEnd,
          pricePaid,
          active,
        });
        //When I get this, I should also push this to my owner and rentee's history.
        return parkingRental;
      } catch (err) {
        console.log(err);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(`Our user is : ${user}`);
      if (!user) {
        //REPLACE ME ONCE AUTHENTICATION ERRORS ARE IN!
        console.log("User not found!");
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        console.log("Password is not correct!");
        throw new AuthenticationError("Incorrect credentials");
      }
      //Use this once we're asble to sign tokens

      const token = signToken(user);
      return { token, user };
    },
  },
  Date: dateScalar,
};
module.exports = resolvers;