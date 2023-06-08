import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

export const ParkingSpotCard = ({ ParkingSpot }) => {
  if (!ParkingSpot) {
    return <h1>No Parking Spot found!</h1>;
  }
  //Add logic to parse the dateStarts and dateEnds.

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
