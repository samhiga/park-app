const { gql } = require("apollo-server-express");

// image: String
//I used to belong in ParkingSpot

const typeDefs = gql`
  scalar Date
  type ParkingSpot {
    _id: ID!
    name: String!
    description: String!
    owner: User!
    streetAddress: String!
    zipcode: String!
    pricebyday: Int!
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
    dateBookedStart: Date!
    dateBookedEnd: Date!
    pricePaid: Int!
    active: Boolean!
  }

  type User {
    _id: ID!
    userName: String!
    password: String!
    email: String!
    biography: String
    rentalSpots: [ParkingSpot]
    renteeSpots: [ParkingSpot]
    history: [ParkingRental]
  }

  type Mutation {
    createUser(input: UserInput!): User
    login(email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    createParkingSpot(input: ParkingSpotInput!): ParkingSpot
    updateParkingSpot(_id: ID!, input: ParkingSpotInput!): ParkingSpot
    deleteParkingSpot(_id: ID!): ParkingSpot
    createParkingRental(input: ParkingRentalInput!): ParkingRental
    deleteParkingRental(_id: ID!): ParkingRental
  }
`;

// type Auth {
// token: ID!
// user: User
// }
module.exports = typeDefs;
