import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// import ParkingSpotList from "../components/ParkingSpotList";
import { MDBCardBody, MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";

const History = () => {
  // const { loading, data } = useQuery(QUERY_USER);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // const user = data?.user;
  // const userPastParkingSpots = user?.history || [];

  //Have logic to separate our "Active" From "Inactive"
  // const [activeSpot, setActiveSpot] = useState([]);
  // const [deactiveSpot, setDeactiveSpot] = useState([]);
  useEffect(() => {
    console.log("Document title");
    console.log(document.title);
  });
  return (
    <div>
      <div className="container">
        <MDBCardBody>
          <MDBCol className="min-vh-100 g-5 p-5 mb-4">
            <MDBRow className="row-cols-1 row-cols-md-3 g-5 p-5 mb-4"></MDBRow>
          </MDBCol>
        </MDBCardBody>
      </div>
    </div>
  );
};

// {cardData.map((data) => (
//   <ParkingSpotCard key={data._id} ParkingSpot={data} />
// ))}
export default History;
