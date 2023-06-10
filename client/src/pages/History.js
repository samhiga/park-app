import React from "react";
import ParkingSpotList from "../components/ParkingSpotList";
// import { useQuery } from "@apollo/client";
// import { QUERY_USER_PAST_PARKING_SPOTS } from "../utils/queries";

const History = () => {
//   const { loading, data } = useQuery(QUERY_USER_PAST_PARKING_SPOTS);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const userPastParkingSpots = data?.userPastParkingSpots || [];

  return (
    <div>
      <div className="container">
        <ParkingSpotList parkingSpots={[]} />
        <p>Hello World</p>
      </div>
    </div>
  );
};

export default History;