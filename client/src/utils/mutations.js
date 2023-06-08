import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser (username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const CREATE_PARKING_SPOT = gql`
  mutation CreateParkingSpot(
    $name: String!
    $owner: String!
    $streetAddress: String!
    $zipcode: String!
    $price: String!
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

