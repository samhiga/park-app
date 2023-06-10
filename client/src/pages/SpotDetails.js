import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QUERY_SINGLE_PARKING_SPOT } from "../utils/queries";

const SpotDetails = () => {
  const { spotId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PARKING_SPOT, {
    variables: { id_inserter: spotId },
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const { loading, data } = useQuery(QUERY_PARKING_SPOTS);
  //I want to KNOW if my query single parking spot is correct.

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

  // function to set min end date to whatever user selects for start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Update the minimum end date based on the selected start date
    setEndDate((prevEndDate) => {
      if (date > prevEndDate) {
        return date;
      }
      return prevEndDate;
    });
  };

  const calculatePrice = () => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const days = (end - start) / (1000 * 3600 * 24);
    return spot.price * days;
  };

  return (
    <div>
      <div className="container">
        <h2>{spot.name}</h2>
        <p>Description: {spot.description}</p>
        <p>Owner: {spot.owner.username}</p>
        <p>
          Address: {spot.streetAddress}, {spot.zipcode}
        </p>
        <p>Price: {spot.price}</p>
        <p>Active: {spot.active ? "Yes" : "No"}</p>
        <p>Date Start: {spot.dateStart}</p>
        <p>Date End: {spot.dateEnd}</p>
        {/* <p>Schedule: {getScheduleString(spot)}</p> */}
        <p>Pick Start Date</p>
        <DatePicker
          label="Pick Start Date"
          name="startDate"
          selected={startDate}
          onChange={handleStartDateChange}
          value={startDate}
          required
        />
        <p>Pick End Date</p>
        <DatePicker
          name="endDate"
          label="Pick End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          value={endDate}
          minDate={startDate}
          required
        />
        <p>Total Price: ${calculatePrice()}</p>
      </div>
    </div>
  );
};

// const getScheduleString = (spot) => {
//   const days = [
//     { label: "Sunday", value: spot.sunday },
//     { label: "Monday", value: spot.monday },
//     { label: "Tuesday", value: spot.tuesday },
//     { label: "Wednesday", value: spot.wednesday },
//     { label: "Thursday", value: spot.thursday },
//     { label: "Friday", value: spot.friday },
//     { label: "Saturday", value: spot.saturday },
//   ];

//   const activeDays = days.filter((day) => day.value);

//   return activeDays.map((day) => day.label).join(", ");
// };

export default SpotDetails;
