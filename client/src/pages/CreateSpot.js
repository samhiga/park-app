import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ParkingSpotCard from "../components/ParkingSpotCard";
// import { useQuery } from "@apollo/client";
// import { QUERY_PARKING_SPOTS } from "../utils/queries";
//TO DO LIST
import { CREATE_PARKING_SPOT } from "../utils/mutations";

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
//TO DO:
//Implement authorizations
//Implement a checker so that the user cannot
//Implement logic so that after the user submits, it brings us back to the homepage or their newly createdc spot.
const CreateSpot = () => {
  //!!!!I might need to query "ME" to get our ID to associate it with our create parking spot.

  //Save our form information to the state
  const [formData, setformData] = useState({
    //add additional form data here
    name: "",
    streetAddress: "",
    zipcode: "",
    price: "",
    description: "",
    dateStart: new Date().getTime(),
    dateEnd: new Date().getTime(),
    owner: "64850cccff1d568b3dd00a2f",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //   const [totalPrice, settotalPrice] = useState(0);
  //Mutation to push info to
  const [createParkingSpot, { muterror, data }] =
    useMutation(CREATE_PARKING_SPOT);

  //Handle inputChange
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "price") {
      console.log("It's the price!");
      setformData({ ...formData, [name]: value.toString() });
    }
    // console.log(event.target);
    setformData({ ...formData, [name]: value });
  };

  //Handle date changes
  const handleStartChange = (event) => {
    const newStartDate = event.getTime();
    setStartDate(newStartDate);

    setformData((prevFormData) => ({
      ...prevFormData,
      dateStart: newStartDate,
    }));
  };
  //Set the end date for our end change.
  //It's aseparate function because the date object does not contain a target,
  //Also, it's hard to tell the event handler whether it's parent is for the end date or start date.
  //I know, it sucks. I want to fix it. There is no time.
  const handleEndChange = (event) => {
    const newEndDate = event.getTime();
    //Save it to a variable, because setEnd date and setFormData are async events.
    setEndDate(newEndDate);

    setformData((prevFormData) => ({
      ...prevFormData,
      dateEnd: newEndDate,
    }));
  };

  //Handle the button Push
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(formData);
    // const form = event.currentTarget;
    // console.log(form);
    //when validity is implemented, turn me back on.
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const response = await createParkingSpot({
        variables: { ...formData },
      });
      console.log("Response is: ");
      console.log(response);
      //Log will return our user information RN. It should be returning AUTH.
      //It's ready to setup with AUTH.
      if (!response.ok) {
        throw new Error("ParkingSpot was not found!");
      }
      // when tokens are implemented, turn me back on
      // const { token, user } = await response.json();
      //Auth for logging in.
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
    //Clear the form.
    setformData({
      name: "",
      streetAddress: "",
      zipcode: "",
      price: "",
      description: "Enter a description!",
      dateStart: new Date().getTime(),
      dateEnd: new Date().getTime(),
      owner: "64850cccff1d568b3dd00a2f",
    });
  };

  return (
    <div>
      <MDBContainer>
      <MDBCard style={{ background: 'linear-gradient(90deg, rgba(69,69,69,1) 0%, rgba(89,89,91,1) 50%, rgba(69,69,69,1) 100%)' }}>
        <MDBCardBody style={{ padding: "20px" }}>
        <MDBCardTitle>Welcome To Create A Parking Spot!</MDBCardTitle>
        <MDBCardText>Just fill out the forms to start making money on your parking spot!</MDBCardText>
        <form id="createspotform" onSubmit={handleSubmit}>
          <MDBInput
            name="name"
            label="What would you like to name your parking spot?"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.name}
            required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <MDBInput
            name="streetAddress"
            label="What is the street address of your parking spot?"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.streetAddress}
            required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <MDBInput
            name="zipcode"
            label="What is the zipcode of your parking spot?"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.zipcode}
            required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <MDBInput
            name="description"
            label="Please write a description of your parking spot"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.description}
            required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <MDBInput
            name="price"
            label="How much would you like to charge per day in USD?"
            id="createspotform"
            type="number"
            onChange={HandleInputChange}
            value={formData.price}
            required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <p> Pick Start Date </p>
          <DatePicker
            label="Pick Start Date"
            name="startDate"
            selected={startDate}
            onChange={handleStartChange}
            value={formData.startDate}
            minDate={new Date()}
            required
          />
          <p> Pick End Date </p>
          <DatePicker
            name="endDate"
            label="Pick End Date"
            selected={endDate}
            onChange={handleEndChange}
            value={formData.endDate}
            //min date is set to startDate so that the user cannot choose a date before our start date.
            minDate={startDate}
            // required
          />
          <div style={{ marginBottom: '1rem' }}></div>
          <MDBBtn
            className="mb-4 w-100 text-center"
            type="submit"
            form="createspotform"
          >
            Register your spot
          </MDBBtn>
        </form>
        </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default CreateSpot;
