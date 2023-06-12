import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;
// token
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
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
    $streetAddress: String!
    $zipcode: String!
    $price: String!
    $dateStart: Date!
    $description: String!
    $dateEnd: Date!
    $owner: ID
  ) {
    createParkingSpot(
      name: $name
      streetAddress: $streetAddress
      zipcode: $zipcode
      price: $price
      dateStart: $dateStart
      description: $description
      dateEnd: $dateEnd
      owner: $owner
    ) {
      _id
      name
      streetAddress
      zipcode
      price
      dateStart
      description
      dateEnd
      owner {
        _id
      }
    }
  }
`;

export const CREATE_PARKING_RENTAL = gql`
  mutation CreateParkingRental(
    $owner: ID
    $rentee: ID
    $dateBookedStart: Date
    $dateBookedEnd: Date
    $pricePaid: String
    $active: Boolean
  ) {
    createParkingRental(
      owner: $owner
      rentee: $rentee
      dateBookedStart: $dateBookedStart
      dateBookedEnd: $dateBookedEnd
      pricePaid: $pricePaid
      active: $active
    ) {
      owner {
        _id
      }
      rentee {
        _id
      }
      dateBookedStart
      dateBookedEnd
      pricePaid
      active
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
