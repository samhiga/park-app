import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PARKING_SPOTS } from "../utils/queries";
import { ParkingSpotCard } from "../components/ParkingSpotCard";
// import { HelloWorld } from "../components/helloworld";
const ParkingSpotList = () => {
  const { loading, data } = useQuery(QUERY_PARKING_SPOTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const cardData = data?.parkingSpot || [];

  //Add logic to map through our card data, feed that to create a parkingSpot, feed each iterationg into ParkingSpot on the ParkingSpotCard.
  return (
    <div>
      {cardData &&
        cardData.map((data) => (
          <div key={data._id}>
            <ParkingSpotCard ParkingSpot={data} />
          </div>
        ))}
    </div>
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
