import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// import ParkingSpotList from "../components/ParkingSpotList";
import { ParkingSpotSesh } from "../components/ParkingSpotSesh";
import { ParkingSpotCard } from "../components/ParkingSpotCard";
import {
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBCardTitle,
  MDBCard,
} from "mdb-react-ui-kit";
//I have to query for the user

//I then grab the data from that user, and separate the content within it's history and rented spots

//Map through our data's history

//Grab only ones that are active, display them in the active branch.
//Grab the ones that are inactive, display them in the inactive branch.

const History = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const [activeRental, setActiveRental] = useState([]);
  const [activeRented, setactiveRented] = useState([]);
  const [deactiveRented, setDeactiveRented] = useState([]);

  useEffect(() => {
    if (!loading) {
      const user = data?.user;
      let activeUser = user[Math.floor(Math.random() * user.length)];
      console.log("Data is: ");
      console.log(activeUser);
      let activeRented = [];
      let deactiveRented = [];
      let activeRental = [];

      for (let i = 0; i < activeUser.rentalSpots.length; i++) {
        activeRental.push(activeUser.rentalSpots[i]);
      }
      for (let i = 0; i < activeUser.history.length; i++) {
        if (activeUser.history[i].active) {
          activeRented.push(activeUser.history[i]);
        } else {
          deactiveRented.push(activeUser.history[i]);
        }
      }
      setActiveRental(activeRental);
      setactiveRented(activeRented);
      setDeactiveRented(deactiveRented);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let sayHi = () => {
    console.log("active rental is: ");
    console.log(activeRental);
  };
  //Have logic to separate our "Active" From "Inactive"
  

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <MDBContainer>
      <MDBRow>
    <MDBCol>
      <MDBCard style={{ marginBottom: '1rem' }}> 
        <MDBCardBody>
          <MDBCardTitle className="text-center">
            <h1 className="display-4 mb-4">Spots on Market</h1>
          </MDBCardTitle>
          <MDBRow>
            {activeRental.map((data) => (
              <MDBCol key={data._id} md="4">
                <div className="text-center">
                  <ParkingSpotCard ParkingSpot={data} />
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBRow>
    <MDBCol>
      <MDBCard style={{ marginBottom: '1rem' }}>
        <MDBCardBody>
          <MDBCardTitle className="text-center">
            <h1 className="display-4 mb-4">Active Purchases</h1>
          </MDBCardTitle>
          <MDBRow>
            {activeRented.map((data) => (
              <MDBCol key={data._id} md="4">
                <div className="text-center">
                  <ParkingSpotSesh ParkingSpot={data} />
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>

  <MDBRow>
    <MDBCol>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle className="text-center">
            <h1 className="display-4 mb-4">Inactive Purchases</h1>
          </MDBCardTitle>
          <MDBRow>
            {deactiveRented.map((data) => (
              <MDBCol key={data._id} md="4">
                <div className="text-center">
                  <ParkingSpotSesh ParkingSpot={data} />
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
        {/* <MDBRow>
          <MDBCard> */}
            {/* Render your cards using a mapping function */}
            {/* {userPastParkingSpots.map((data) => ( */}
            {/* <MDBCol key={data.id}> */}
            <MDBCardBody>
              <p>{sayHi()}</p>
            </MDBCardBody>
            {/* </MDBCol> */}
            {/*  ))} */}
          {/* </MDBCard>
        </MDBRow> */}
      </MDBContainer>
    </div>
  );
};

// {cardData.map((data) => (
//   <ParkingSpotCard key={data._id} ParkingSpot={data} />
// ))}
export default History;
