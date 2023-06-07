import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from '@apollo/client';
import { GET_PARKING_SPOT } from '../utils/queries';

const SpotDetails = () => {
  const { spotId } = useParams();
  const { loading, data } = useQuery(GET_PARKING_SPOT, {
    variables: { spotId: parseInt(spotId) }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const spot = data?.parkingSpot;

  if (!spot) {
    return <div>Spot not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>{spot.name}</h2>
        <p>Description: {spot.description}</p>
        <p>Owner: {spot.owner}</p>
        <p>Address: {spot.streetAddress}, {spot.zipcode}</p>
        <p>Price: {spot.price}</p>
        <p>Active: {spot.active ? "Yes" : "No"}</p>
        <p>Date Start: {spot.dateStart}</p>
        <p>Date End: {spot.dateEnd}</p>
        <p>Schedule: {getScheduleString(spot)}</p>
      </div>
    </div>
  );
};

const getScheduleString = (spot) => {
  const days = [
    { label: "Sunday", value: spot.sunday },
    { label: "Monday", value: spot.monday },
    { label: "Tuesday", value: spot.tuesday },
    { label: "Wednesday", value: spot.wednesday },
    { label: "Thursday", value: spot.thursday },
    { label: "Friday", value: spot.friday },
    { label: "Saturday", value: spot.saturday },
  ];

  const activeDays = days.filter((day) => day.value);

  return activeDays.map((day) => day.label).join(", ");
};

export default SpotDetails;
