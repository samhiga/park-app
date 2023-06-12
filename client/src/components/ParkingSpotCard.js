import { Link } from "react-router-dom";
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
  // Add logic to parse the dateStarts and dateEnds.
  const spotDetailsPath = `/spotdetails/${ParkingSpot._id}`;
  
  // change date to local time
  const formattedDateStart = new Date(ParkingSpot.dateStart).toLocaleDateString();
  const formattedDateEnd = new Date(ParkingSpot.dateEnd).toLocaleDateString();

  return (
    <Link to={spotDetailsPath}>
    <MDBCard className="text-center h-100 mb-4 g-3 p-3 x-4 y-4 text-white" style={{ maxWidth: "22rem", backgroundColor: "#1565C0" }}  t>
      <MDBCardBody>
        <MDBCardTitle>{ParkingSpot.name}</MDBCardTitle>
        <MDBCardText>{`${ParkingSpot.streetAddress}, ${ParkingSpot.zipcode}`}</MDBCardText>
        <MDBCardText>{`${formattedDateStart} - ${formattedDateEnd}`}</MDBCardText>
        <MDBCardText>{ParkingSpot.description}</MDBCardText>
        <MDBCardText>${ParkingSpot.price} Per Day</MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </Link>
  );
};
