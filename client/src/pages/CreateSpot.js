import React from "react";
import HelloWorld from "../components/helloworld";
// import { Link } from "react-router-dom";
// import ParkingSpotCard from "../components/ParkingSpotCard";
// import { useQuery } from "@apollo/client";
// import { QUERY_PARKING_SPOTS } from "../utils/queries";

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
  return (
    <div>
      {/* <MDBContainer>
        <form>
          <MDBInput
            name="email"
            label="Email address"
            id="loginform"
            type="email"
            onChange={handleLoginInputChange}
            value={userFormData.email}
            required
          />
          <MDBInput
            name="password"
            label="Password"
            id="loginform"
            type="password"
            onChange={handleLoginInputChange}
            value={userFormData.password}
            required
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>
          <MDBBtn
            className="mb-4 w-100 text-center"
            type="submit"
            form="loginform"
          >
            Sign in
          </MDBBtn>
        </form>
      </MDBContainer> */}
    </div>
  );
};

export default CreateSpot;
