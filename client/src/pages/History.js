import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// import ParkingSpotList from "../components/ParkingSpotList";
import { MDBCardBody, MDBCardText, MDBCol, MDBRow, MDBContainer, MDBCardTitle, MDBCard } from "mdb-react-ui-kit";

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
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <div className="text-center">
              <h1 className="display-4 mb-4">History</h1>
              <p>Use this page to view all of your past parking spots!</p>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-3 g-5 p-5 mb-4">
          <MDBCard style={{ background: 'linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)' }}>
          {/* Render your cards using a mapping function */}
          {/* {userPastParkingSpots.map((data) => ( */}
            {/* <MDBCol key={data.id}> */}
              <MDBCardBody>
                <p>{}</p>
              </MDBCardBody>
            {/* </MDBCol> */}
          {/*  ))} */}
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

// {cardData.map((data) => (
//   <ParkingSpotCard key={data._id} ParkingSpot={data} />
// ))}
export default History;
