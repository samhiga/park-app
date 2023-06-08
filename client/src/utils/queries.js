import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      rentalSpots {
        _id
        name
        streetAddress
        zipcode
        price
        dateStart
        dateEnd
        description
      }
    }
  }
`;

export const QUERY_PARKING_SPOTS = gql`
  query getParkingSpots {
    parkingSpots {
      _id
      name
      streetAddress
      zipcode
      price
      dateStart
      dateEnd
      description
    }
  }
`;

export const QUERY_SINGLE_PARKING_SPOT = gql`
  query getSingleParkingSpot($parkingSpotId: ID!) {
    parkingSpot(parkingSpotId: $parkingSpotId) {
      _id
      name
      streetAddress
      zipcode
      price
      dateStart
      dateEnd
      description
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      rentalSpots {
        _id
        name
        streetAddress
        zipcode
        price
        dateStart
        dateEnd
        description
      }
    }
  }
`;
