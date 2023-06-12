import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { QUERY_SINGLE_PARKING_SPOT } from "../utils/queries";
import { CREATE_PARKING_RENTAL } from "../utils/mutations";

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

//TO DO: ADD IN MUTATION TO CREATURE A PARKING RENTAL SESSION
//ADD IN AN EVENT FOR THE BUTTON CLICK TO TAKE IN OUR FORM DETAILS AND CREATE A SESSION BETWEEN THE OWNER AND USER (ME);
//ALSO PUSH THE SESSION TO BOTH OWNER AND USERS HISTORIES

const SpotDetails = () => {
  //Spot detail extraction
  const { spotId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PARKING_SPOT, {
    variables: { id_inserter: spotId },
  });
  //Date setters
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ownerState, setOwnerState] = useState();
  const [priceState, setPriceState] = useState();
  //Form data
  const [createformData, { err, createdformdata }] = useMutation(
    CREATE_PARKING_RENTAL
  );
  //spot.owner.id
  const [formState, setFormState] = useState({
    owner: "64856e5473c4b0334ec6f132",
    rentee: "64856e5473c4b0334ec6f132",
    dateBookedStart: new Date().getTime(),
    dateBookedEnd: new Date().getTime(),
    pricePaid: "50",
    active: true,
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  //Data for sopt in spot.
  const spot = data?.getSPP;

  if (!spot) {
    return <div>Spot not found</div>;
  }

  if (!spot.owner) {
    spot.owner.username = "Username not found!";
  }
  const currOwner = spot.owner._id.toString();
  //Form Handler Function

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    updateParticipants();
    updateParticipants();
    //update the owner to be our current owner.
    setFormState((prevFormData) => ({
      ...prevFormData,
      owner: ownerState,
    }));

    console.log("Form state is: ");
    console.log(formState);

    console.log("Submitting spot details form");
    try {
      let response = await createformData({
        variables: { ...formState },
      });

      console.log("response is: ");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //LORD HELP ME FOR I HAVE SINNED
  const formattedDateStart = new Date(spot.dateStart).toLocaleDateString();
  const formattedDateEnd = new Date(spot.dateEnd).toLocaleDateString();
  let enddatemaxdate = new Date(spot.dateEnd);
  let startdatemaxdate = new Date(endDate);
  let enddatemindate = new Date(startDate);
  //LORD HELP ME FOR I HAVE SINNED
  //This works. I don't know exactly why. I am in a state of trance.

  //GOD THIS IS SO HACKY
  //FORGIVE ME PLEASE (You'll have to feather the form to get this to work LOL)
  //This is what useEffect() is for ? but it's not playing nice :)
  const updateParticipants = (event) => {
    //We'll have to grab our rentee from the Auth and update the formstate with him as well.
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setOwnerState(currOwner);
    setPriceState(calculatePrice());
    setFormState((prevFormData) => ({
      ...prevFormData,
      owner: currOwner,
      pricePaid: priceState,
    }));
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.getTime();

    setStartDate(newStartDate);
    setPriceState(calculatePrice());
    setFormState((prevFormData) => ({
      ...prevFormData,
      dateBookedStart: newStartDate,
      pricePaid: priceState,
    }));
  };
  const handleEndDateChange = (event) => {
    const newEndDate = event.getTime();

    setEndDate(newEndDate);
    setPriceState(calculatePrice());
    setFormState((prevFormData) => ({
      ...prevFormData,
      dateBookedEnd: newEndDate,
      pricePaid: priceState,
    }));
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
          <MDBCard
            style={{
              background:
                "linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)",
            }}
          >
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
          <MDBCard
            style={{
              background:
                "linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)",
            }}
          >
            <MDBCardBody>
              <MDBCardText>
                <p>Price: ${spot.price} a day</p>
                <p>Park-in</p>
                <form
                  id="createrentalform"
                  onSubmit={handleSubmit}
                  onFocus={updateParticipants}
                >
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
                  <MDBBtn
                    color="secondary"
                    type="submit"
                    form="createrentalform"
                  >
                    Rent Me
                  </MDBBtn>
                </form>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SpotDetails;
