import React from "react";
import ParkingSpotList from "../components/ParkingSpotCard";
// import { Link } from "react-router-dom";
// import ParkingSpotCard from "../components/ParkingSpotCard";
// import { useQuery } from "@apollo/client";
// import { QUERY_PARKING_SPOTS } from "../utils/queries";

const Home = () => {

  return (
    <div>
      <div className="container">
        <ParkingSpotList />
      </div>
    </div>
  );
};

export default Home;
