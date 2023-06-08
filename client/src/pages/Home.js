import React from "react";
import { Link } from "react-router-dom";
import ParkingSpotCard from "../components/ParkingSpotCard";
import { useQuery } from "@apollo/client";
import { QUERY_PARKING_SPOTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_PARKING_SPOTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const parkingSpotData = data?.parkingSpots || [];

  return (
    <div>
      <div className="container">
        <div className="row">
          {parkingSpotData.map((parkingSpot) => (
            <div className="col-md-4" key={parkingSpot.id}>
              <Link
                to={`/parkingSpot/${parkingSpot.id}`}
                style={{ textDecoration: "none" }}
              >
                <ParkingSpotCard parkingSpot={parkingSpot} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
