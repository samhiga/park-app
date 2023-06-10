import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@apollo/client";

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

const CreateSpot = () => {
  //!!!!I might need to query "ME" to get our ID to associate it with our create parking spot.

  //   let totalDays = 0;
  //Save our form information to the state
  const [formData, setformData] = useState({
    //add additional form data here
    name: "",
    owner: "Farley",
    streetAddress: "",
    zipcode: "",
    price: "",
    dateStart: "",
    dateEnd: "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //   const [totalPrice, settotalPrice] = useState(0);
  //Mutation to push info to
  const [createParkingSpot, { err, data }] = useMutation(CREATE_PARKING_SPOT);

  //Handle inputChange
  const HandleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setformData({ ...formData, [name]: value });
  };

  //Handle the button Push
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setformData({ ...formData, dateStart: startDate });
    setformData({ ...formData, dateEnd: endDate });
    console.log(formData);
    const form = event.currentTarget;
    console.log(form);
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
      console.log("User is: ");
      console.log(response);
      //Auth for logging in.
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
    //Clear the form.
    setformData({
      email: "",
      password: "",
    });
  };
  // Date Object
  // //Accept some dates.
  //   <MDBInput
  //   name=""
  //   label=""
  //   id="createspotform"
  //   type=""
  //   onChange={HandleInputChange}
  //   value={formData.}
  //   required
  // />
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
            onChange={(date) => setStartDate(date)}
            value={formData.startDate}
            required
          />
          <p> Pick End Date </p>
          <DatePicker
            name="endDate"
            label="Pick End Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            value={formData.endDate}
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
