const { gql } = require("apollo-server-express");

// image: String
//I used to belong in ParkingSpot
//Add me back to typeMutation once you're ready.
// deleteUser(_id: ID!): User
// deleteUser(_id: ID!): User
// deleteParkingSpot(_id: ID!): ParkingSpot
// updateParkingSpot(_id: ID!): ParkingSpot
const typeDefs = gql`
  scalar Date

  type Query {
    user: [User]
    parkingSpot: [ParkingSpot]
    parkingRental: [ParkingRental]
    getSingleParkingSpot(_id: ID!): ParkingSpot
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createParkingSpot(
      name: String!
      owner: String!
      streetAddress: String!
      zipcode: String!
      price: Int!
      dateStart: Date!
      dateEnd: Date!
    ): ParkingSpot

    createParkingRental(
      owner: String!
      rentee: String!
      dateBookedStart: Date!
      dateBookedEnd: Date!
      pricePaid: Int!
      active: Boolean!
    ): ParkingRental
  }

  type ParkingSpot {
    _id: ID!
    name: String!
    description: String
    owner: User!
    streetAddress: String!
    zipcode: String!
    price: Int!
    active: Boolean!
    dateStart: String!
    dateEnd: String!
    sunday: Boolean
    monday: Boolean
    tuesday: Boolean
    wednesday: Boolean
    thursday: Boolean
    friday: Boolean
    saturday: Boolean
  }

  type ParkingRental {
    _id: ID!
    owner: User!
    rentee: User!
    dateBookedStart: String!
    dateBookedEnd: String!
    pricePaid: Int!
    active: Boolean!
  }

  type User {
    _id: ID!
    username: String
    password: String!
    email: String!
    biography: String
    rentalSpots: [ParkingSpot]
    renteeSpots: [ParkingSpot]
    history: [ParkingRental]
  }
`;
//Add me to the mutation once Auths are in.
// login(email: String!, password: String!): Auth

// type Auth {
// token: ID!
// user: User
// }
module.exports = typeDefs;
