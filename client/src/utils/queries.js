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
      pastParkingSpots: history {
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
  query parkingSpot {
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
  query getSingleParkingSpot($id_inserter: ID!) {
    getSPP(_id: $id_inserter) {
      _id
      name
      description
      streetAddress
      zipcode
      price
      active
      dateStart
      dateEnd
      owner {
        _id
        username
      }
    }
  }
`;
// name
// streetAddress
// zipcode
// price
// dateStart
// dateEnd
// description
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
