const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ParkingSpot {
    _id: ID!
    name: String!
    description: String!
    owner: User!
    streetAddress: String!
    zipcode: String!
    image: String
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

  type ParkingSpotRental {
    _id: ID
    owner: User
    rentee: User
    dateBookedStart: String
    dateBookedEnd: String
    pricePaid: Intz
    active: Boolean
  }

  type User {
    _id: ID
    userName: String
    email: String
    rentalSpots: [ParkingSpot]
    renteeSpots: [ParkingSpotRental]
    history: [ParkingSpotRental]
    biography: String
  }

  type Mutation {
    createUser(input: UserInput!): User
    login(email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    createParkingSpot(input: ParkingSpotInput!): ParkingSpot
    updateParkingSpot(_id: ID!, input: ParkingSpotInput!): ParkingSpot
    deleteParkingSpot(_id: ID!): ParkingSpot
    createParkingRental(input: ParkingRentalInput!): ParkingSpotRental
    deleteParkingRental(_id: ID!): ParkingSpotRental
  }
`;

// type Auth {
// token: ID!
// user: User
// }
module.exports = typeDefs;
