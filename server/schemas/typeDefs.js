const { gql } = require("apollo-server-express");

// image: String
//I used to belong in ParkingSpot
//Add me back to typeMutation once you're ready.
// deleteUser(_id: ID!): User
// deleteUser(_id: ID!): User
// deleteParkingSpot(_id: ID!): ParkingSpot
// updateParkingSpot(_id: ID!): ParkingSpot

// rentee: User!
// dateBookedStart: Date!
// dateBookedEnd: Date!
// pricePaid: Int!
// active: Boolean!

// rentee: String!
// dateBookedStart: Date!
// dateBookedEnd: Date!
// pricePaid: Int!
const typeDefs = gql`
  scalar Date
  type Auth {
    token: ID!
    user: User
  }
  type ParkingSpot {
    _id: ID
    name: String!
    description: String
    streetAddress: String!
    zipcode: String!
    price: String!
    active: Boolean
    dateStart: Date
    dateEnd: Date
    owner: User
  }

  type ParkingRental {
    _id: ID
    owner: User
    rentee: User
    dateBookedStart: Date!
    dateBookedEnd: Date!
    pricePaid: String!
    active: Boolean
  }

  type User {
    _id: ID
    username: String
    password: String!
    email: String!
    biography: String
    rentalSpots: [ParkingSpot]
    history: [ParkingRental]
    pastParkingSpots: [ParkingSpot]
  }
  type Query {
    user: [User]
    parkingSpot: [ParkingSpot]
    parkingRental: [ParkingRental]
    getSPP(_id: ID!): ParkingSpot
    me: User
    userPastParkingSpots: [ParkingSpot]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    createParkingSpot(
      name: String!
      streetAddress: String!
      zipcode: String!
      price: String!
      dateStart: Date!
      description: String
      dateEnd: Date!
      owner: ID
    ): ParkingSpot

    createParkingRental(
      owner: ID
      rentee: ID
      dateBookedStart: Date
      dateBookedEnd: Date
      pricePaid: String
      active: Boolean
    ): ParkingRental
  }
`;
//Add me to the mutation once Auths are in.
// login(email: String!, password: String!): Auth

// type Auth {
// token: ID!
// user: User
// }
module.exports = typeDefs;
