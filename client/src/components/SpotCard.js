import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";

const SpotCard = ({ spot }) => {
  return (
    <MDBCard style={{ maxWidth: "22rem" }}>
      <MDBCardBody>
        <MDBCardTitle>{spot.name}</MDBCardTitle>  // assuming spot object has a name
        <MDBCardText>
          {spot.description}  // assuming spot object has a description
        </MDBCardText>
        {/* Add more fields as needed */}
      </MDBCardBody>
    </MDBCard>
  );
};

export default SpotCard;
