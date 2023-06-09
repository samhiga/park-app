import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PARKING_SPOTS } from "../utils/queries";
import { ParkingSpotCard } from "../components/ParkingSpotCard";
import { MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
// import "./ParkingSpotList.css";
// import { HelloWorld } from "../components/helloworld";
const ParkingSpotList = () => {
  const { loading, data } = useQuery(QUERY_PARKING_SPOTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const cardData = data?.parkingSpot || [];

  //Add logic to map through our card data, feed that to create a parkingSpot, feed each iterationg into ParkingSpot on the ParkingSpotCard.
  return (
    <MDBCol key={data._id} className = "min-vh-100 g-5 p-5 mb-4">
        <MDBRow className="row-cols-1 row-cols-md-3 g-5 p-5 mb-4">
      {cardData.map((data) => (
          
            <ParkingSpotCard ParkingSpot={data} />
          
            ))}
    </MDBRow>
            </MDBCol>
  );
};
export default ParkingSpotList;

//ParkingSpot={cardData}

// export default ParkingSpotList;

// import React, { useEffect } from 'react';
// import ParkingSpotCard from '../ParkingSpotCard';
// // import { useStoreContext } from '../../utils/GlobalState';
// // import { UPDATE_PRODUCTS } from '../../utils/actions';

// import { useQuery } from '@apollo/client';

// // import { idbPromise } from '../../utils/helpers';
// // import spinner from '../../assets/spinner.gif';

// const ParkingSpotList = () => {

//   const { loading, data } = useQuery(QUERY_PARKING_SPOTS);

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   const parkingSpotData = data?.parkingSpots || [];
//   console.log(parkingSpotData);
//   return (
//     <p>Hello!</p>

//   );

// };

// export default ParkingSpotList;
// <div className="my-2">

// <h2>Our ParkingSpots:</h2>
// {parkingSpotData.map((parkingSpot) => (
//   <div className="col-md-4" key={parkingSpot.id}>
//     <Link
//       to={`/parkingSpot/${parkingSpot.id}`}
//       style={{ textDecoration: "none" }}
//     >
//       <ParkingSpotCard parkingSpot={parkingSpot} />
//     </Link>
//   </div>
// ))}
//   </div>
// ) : (
//   <h3>You haven't added any products yet!</h3>
// )}
// {loading ? <p>"Loading!"</p> : null}
// </div>
// );
