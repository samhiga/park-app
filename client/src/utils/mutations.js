import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;
// token
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

// user {
//   _id
//   username
//   email
//   password
// }
//token
export const CREATE_PARKING_SPOT = gql`
  mutation CreateParkingSpot(
    $name: String!
    $owner: String!
    $streetAddress: String!
    $zipcode: String!
    $price: Int!
    $dateStart: Date!
    $dateEnd: Date!
  ) {
    createParkingSpot(
      name: $name
      owner: $owner
      streetAddress: $streetAddress
      zipcode: $zipcode
      price: $price
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      _id
      name
      owner {
        _id
        username
      }
      streetAddress
      zipcode
      price
      active
      dateStart
      dateEnd
      sunday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
    }
  }
`;

export const UPDATE_PARKING_SPOT = gql`
  mutation UpdateParkingSpot(
    $_id: ID!
    $name: String
    $description: String
    $owner: ID
    $streetAddress: String
    $zipcode: String
    $price: Int
    $active: Boolean
    $dateStart: String
    $dateEnd: String
    $sunday: Boolean
    $monday: Boolean
    $tuesday: Boolean
    $wednesday: Boolean
    $thursday: Boolean
    $friday: Boolean
    $saturday: Boolean
  ) {
    updateParkingSpot(
      _id: $_id
      input: {
        name: $name
        description: $description
        owner: $owner
        streetAddress: $streetAddress
        zipcode: $zipcode
        price: $price
        active: $active
        dateStart: $dateStart
        dateEnd: $dateEnd
        sunday: $sunday
        monday: $monday
        tuesday: $tuesday
        wednesday: $wednesday
        thursday: $thursday
        friday: $friday
        saturday: $saturday
      }
    ) {
      _id
      name
      description
      owner {
        _id
      }
      streetAddress
      zipcode
      price
      active
      dateStart
      dateEnd
      sunday
      monday
      tuesday
      wednesday
      thursday
      friday
      saturday
    }
  }
`;
