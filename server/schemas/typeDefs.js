const { gql } = require('apollo-server-express');

const typeDefs = gql`
  

  type ParkingSpot {
    _id: ID!
    owner: User!
    image: String!
    streetAddress: String!
    zipcode: String!
    name: String!
    pricebyday: Int!
    active: Boolean!
    datesAvailable: [String]!
    description: String!
    daysUnavailable: [String]!
  }

  type ParkingSpotRental {
    _id: ID
    owner: User
    rentee: User
    dateBookedStart: String
    dateBookedEnd: String
    pricePaid: Int
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