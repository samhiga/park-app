import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// import ParkingSpotList from "../components/ParkingSpotList";
import { MDBCardBody, MDBCardText } from "mdb-react-ui-kit";

const History = () => {
  const { loading, data } = useQuery(QUERY_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.user;
  const userPastParkingSpots = user?.pastParkingSpots || [];

  return (
    <div>
      <div className="container">
        <MDBCardBody>
          <MDBCardText> {userPastParkingSpots} </MDBCardText>
          <p>Hello World</p>
        </MDBCardBody>
      </div>
    </div>
  );
};

export default History;