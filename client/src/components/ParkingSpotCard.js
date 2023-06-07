import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

const SpotCard = ({ ParkingSpot }) => {
  return (
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
  );
};

export default SpotCard;
