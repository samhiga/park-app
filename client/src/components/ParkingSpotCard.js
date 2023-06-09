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

export const ParkingSpotCard = ({ ParkingSpot }) => {
  if (!ParkingSpot) {
    return <h1>No Parking Spot found!</h1>;
  }
  // Add logic to parse the dateStarts and dateEnds.
  const spotDetailsPath = `/spotdetails/${ParkingSpot._id}`;
  //spotdetails/:89237489237489

  return (
    <Link to={spotDetailsPath}>
    <MDBCard className="text-center h-100 mb-4 g-3 p-3 x-4 y-4" style={{ maxWidth: "22rem", backgroundColor: "#557793" }}>
      <MDBCardBody>
        <MDBCardTitle>{ParkingSpot.name}</MDBCardTitle>
        <MDBCardText>{`${ParkingSpot.streetAddress}, ${ParkingSpot.zipcode}`}</MDBCardText>
        <MDBCardText>{ParkingSpot.pricebyday}</MDBCardText>
        <MDBCardText>{`${ParkingSpot.dateStart} - ${ParkingSpot.dateEnd}`}</MDBCardText>
        <MDBCardText>{ParkingSpot.description}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </Link>
  );
};

