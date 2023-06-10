import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PARKING_SPOT } from "../utils/queries";

const SpotDetails = () => {
  const { spotId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PARKING_SPOT, {
    variables: { id_inserter: spotId },
  });

  // const { loading, data } = useQuery(QUERY_PARKING_SPOTS);
  //I want to KNOW if mty query single parking spot is correct.

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
        <button type="button" class="btn btn-secondary">Rent Me</button>
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
