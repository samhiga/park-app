import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import ParkingSpotCard from "../components/ParkingSpotCard";
// import { useQuery } from "@apollo/client";
// import { QUERY_PARKING_SPOTS } from "../utils/queries";

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
    owner: "Farley",
    streetAddress: "",
    zipcode: "",
    price: "",
    dateStart: new Date(),
    dateEnd: new Date(),
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //   const [totalPrice, settotalPrice] = useState(0);
  //Mutation to push info to
  const [createParkingSpot, { error }] = useMutation(CREATE_PARKING_SPOT);

  //Handle inputChange
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target);
    setformData({ ...formData, [name]: value });
  };

  //Handle date changes
  const handleStartChange = (event) => {
    const newStartDate = event;
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
    const newEndDate = event;
    //Save it to a variable, because setEnd date and setFormData are async events.
    setEndDate(newEndDate);

    setformData((prevFormData) => ({
      ...prevFormData,
      dateStart: newEndDate,
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
        throw new Error("User was not found!");
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
      owner: "Farley",
      streetAddress: "",
      zipcode: "",
      price: "",
      dateStart: new Date(),
      dateEnd: new Date(),
    });
  };

  return (
    <div>
      <MDBContainer>
        <form id="createspotform" onSubmit={handleSubmit}>
          <MDBInput
            name="name"
            label="Insert a name for your parking spot"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.name}
            required
          />
          <MDBInput
            name="streetAddress"
            label="Insert a name for your street address"
            id="createspotform"
            type="text"
            onChange={HandleInputChange}
            value={formData.streetAddress}
            required
          />
          <MDBInput
            name="zipcode"
            label="zipcode"
            id="Insert your zipcode"
            type="text"
            onChange={HandleInputChange}
            value={formData.zipcode}
            required
          />
          <MDBInput
            name="price"
            label="price"
            id="Insert how many dollars per day you are charging"
            type="number"
            onChange={HandleInputChange}
            value={formData.price}
            required
          />
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
            required
          />
          <MDBBtn
            className="mb-4 w-100 text-center"
            type="submit"
            form="createspotform"
          >
            Register your spot
          </MDBBtn>
        </form>
      </MDBContainer>
    </div>
  );
};

export default CreateSpot;
