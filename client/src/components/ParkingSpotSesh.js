import { Link } from "react-router-dom";
import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export const ParkingSpotSesh = ({ ParkingSpot }) => {
  if (!ParkingSpot) {
    return <h1>No Parking Spot found!</h1>;
  }
  console.log("Parking Spot is: ");
  console.log(ParkingSpot);
  let formattedDateStart = new Date(
    ParkingSpot.dateBookedStart
  ).toLocaleDateString();
  let formattedDateEnd = new Date(
    ParkingSpot.dateBookedEnd
  ).toLocaleDateString();

  // Add logic to parse the dateStarts and dateEnds.

  // change date to local time

  return (
    <Link>
      <MDBCard
        className="text-center h-100 mb-4 g-3 p-3 x-4 y-4 text-white"
        style={{ maxWidth: "22rem", backgroundColor: "#1565C0" }}
      >
        <MDBCardBody>
          <MDBCardTitle>{`Session ID: ${ParkingSpot._id}`}</MDBCardTitle>
          <MDBCardText>{`Owner: ${ParkingSpot.owner.username}`}</MDBCardText>
          <MDBCardText>{`Rentee: ${ParkingSpot.rentee.username}`}</MDBCardText>
          <MDBCardText>{`${formattedDateStart} - ${formattedDateEnd}`}</MDBCardText>
          <MDBCardText>{`Active: ${ParkingSpot.active}`}</MDBCardText>
          <MDBCardText>Total Price: ${ParkingSpot.pricePaid}</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </Link>
  );
};
