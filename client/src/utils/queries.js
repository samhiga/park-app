import { gql } from "@apollo/client";
// rentalSpots {
//   _id
//   name
//   streetAddress
//   zipcode
//   price
//   dateStart
//   dateEnd
//   description
// }

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      biography
      history {
        _id
        owner {
          _id
          username
        }
        rentee {
          _id
          username
        }
        dateBookedStart
        dateBookedEnd
        pricePaid
        active
      }
      rentalSpots {
        _id
        name
        description
        streetAddress
        zipcode
        price
        dateStart
        dateEnd
      }
    }
  }
`;

export const QUERY_PARKING_SPOTS = gql`
  query parkingSpot {
    parkingSpot {
      _id
      name
      description
      streetAddress
      zipcode
      price
      active
      dateStart
      dateEnd
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
