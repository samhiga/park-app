import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QUERY_SINGLE_PARKING_SPOT } from "../utils/queries";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

//TO DO: ADD IN MUTATION TO CREATURE A PARKING RENTAL SESSION
//ADD IN AN EVENT FOR THE BUTTON CLICK TO TAKE IN OUR FORM DETAILS AND CREATE A SESSION BETWEEN THE OWNER AND USER (ME);
//ALSO PUSH THE SESSION TO BOTH OWNER AND USERS HISTORIES

const SpotDetails = () => {
  const { spotId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PARKING_SPOT, {
    variables: { id_inserter: spotId },
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  if (loading) {
    return <div>Loading...</div>;
  }

  const spot = data?.getSPP;

  if (!spot) {
    return <div>Spot not found</div>;
  }

  if (!spot.owner) {
    spot.owner.username = "Username not found!";
  }

  //LORD HELP ME FOR I HAVE SINNED
  const formattedDateStart = new Date(spot.dateStart).toLocaleDateString();
  const formattedDateEnd = new Date(spot.dateEnd).toLocaleDateString();
  let enddatemaxdate = new Date(spot.dateEnd);
  let startdatemaxdate = new Date(endDate);
  let enddatemindate = new Date(startDate);
  //LORD HELP ME FOR I HAVE SINNED
  //This works. I don't know exactly why. I am in a state of trance.

  const handleStartDateChange = (event) => {
    const newStartDate = event.getTime();
    if (newStartDate > endDate) {
      console.log(newStartDate);
      console.log(endDate);
    } else {
      setStartDate(newStartDate);
    }
  };
  const handleEndDateChange = (event) => {
    const newEndDate = event.getTime();
    setEndDate(newEndDate);
  };

  // calculate the total price of the rental based on how many days are chosen
  const calculatePrice = () => {
    const start = startDate;
    const end = endDate;
    const days = (end - start) / (1000 * 3600 * 24) + 1;
    return (spot.price * days).toFixed();
  };

  //spot returns the date in unix time.

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="8">
          <MDBCard style={{ background: 'linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)' }}>
            <MDBCardBody>
              <MDBCardTitle>{spot.name}</MDBCardTitle>
              <MDBCardText>
                <p>Description: {spot.description}</p>
                <p>Owner: {spot.owner.username}</p>
                <p>
                  Address: {spot.streetAddress}, {spot.zipcode}
                </p>
                <p>Active: {spot.active ? "Yes" : "No"}</p>
                <p>Date Start: {formattedDateStart}</p>
                <p>Date End: {formattedDateEnd}</p>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard style={{ background: 'linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)' }}>
            <MDBCardBody>
              <MDBCardText>
                <p>Price: ${spot.price} a day</p>
                <p>Park-in</p>
                <DatePicker
                  label="Pick Start Date"
                  name="startDate"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  value={startDate}
                  minDate={new Date()}
                  maxDate={startdatemaxdate}
                  required
                />
                <p>Park-out</p>
                <DatePicker
                  name="endDate"
                  label="Pick End Date"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  value={endDate}
                  minDate={enddatemindate}
                  maxDate={enddatemaxdate}
                  required
                />
                <p>Total Price: ${calculatePrice()}</p>
                <MDBBtn color="secondary">Rent Me</MDBBtn>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SpotDetails;
