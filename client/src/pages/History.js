import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// import ParkingSpotList from "../components/ParkingSpotList";
import { ParkingSpotSesh } from "../components/ParkingSpotSesh";
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
      console.log(data);
      let activeRented = [];
      let deactiveRented = [];

      for (let i = 0; i < activeUser.history.length; i++) {
        if (activeUser.history[i].active) {
          activeRented.push(activeUser.history[i]);
        } else {
          deactiveRented.push(activeUser.history[i]);
        }
      }

      setactiveRented(activeRented);
      setDeactiveRented(deactiveRented);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  let sayHi = () => {
    console.log("active rented is: ");
    console.log(activeRented);
    console.log("deactive rented is: ");
    console.log(deactiveRented);
  };
  //Have logic to separate our "Active" From "Inactive"

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <div className="text-center">
              <h1 className="display-4 mb-4">Spots on market</h1>
              {activeRented.map((data) => (
                <ParkingSpotSesh key={data._id} ParkingSpot={data} />
              ))}
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <div className="text-center">
              <h1 className="display-4 mb-4">Spots you are buying</h1>
              {activeRented.map((data) => (
                <ParkingSpotSesh key={data._id} ParkingSpot={data} />
              ))}
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <div className="text-center">
              <h1 className="display-4 mb-4">Inactive Spots you have rented</h1>
              {deactiveRented.map((data) => (
                <ParkingSpotSesh key={data._id} ParkingSpot={data} />
              ))}
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-3 g-5 p-5 mb-4">
          <MDBCard
            style={{
              background:
                "linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)",
            }}
          >
            {/* Render your cards using a mapping function */}
            {/* {userPastParkingSpots.map((data) => ( */}
            {/* <MDBCol key={data.id}> */}
            <MDBCardBody>
              <p>{sayHi()}</p>
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
