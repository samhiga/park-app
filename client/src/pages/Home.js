import React from "react";
import ParkingSpotList from "../components/ParkingSpotList";
import HelloWorld from "../components/fuckthisshit";
// import { Link } from "react-router-dom";
// import ParkingSpotCard from "../components/ParkingSpotCard";
// import { useQuery } from "@apollo/client";
// import { QUERY_PARKING_SPOTS } from "../utils/queries";

const Home = () => {
  return (
    <div>
      <div className="container">
        {/* <HelloWorld /> */}
        <ParkingSpotList />
      </div>
    </div>
  );
};

export default Home;
