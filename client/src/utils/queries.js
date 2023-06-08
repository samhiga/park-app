import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      biography
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
    parkingSpot {
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
      biography
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
      renteeSpots {
        _id
        name
        streetAddress
        zipcode
        price
        dateStart
        dateEnd
        description
      }
      history {
        _id
        owner
        dateBookedStart
        dateBookedEnd
        pricePaid
      }
    }
  }
`;
