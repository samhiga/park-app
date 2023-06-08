import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PARKING_SPOTS } from "../utils/queries";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export const ParkingSpotCard = ({ ParkingSpot }) => {
  console.log(ParkingSpot);
  // if (!ParkingSpot.length) {
  //   return <h1>No Parking Spots found!</h1>;
  // }

  return (
    <div>
      {
        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardBody>
            <MDBCardTitle>{ParkingSpot.name}</MDBCardTitle>
            <MDBCardText>
              {`${ParkingSpot.streetAddress}, ${ParkingSpot.zipcode}`}
            </MDBCardText>
            <MDBCardText>{ParkingSpot.pricebyday}</MDBCardText>
            <MDBCardText>
              {`${ParkingSpot.dateStart} - ${ParkingSpot.dateEnd}`}
            </MDBCardText>
            <MDBCardText>{ParkingSpot.description}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      }
    </div>
  );
};
