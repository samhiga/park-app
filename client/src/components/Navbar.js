import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";
// import SignUpForm from "./SignupForm";
// import LoginForm from "./LoginForm";
import SignupForm from "./SignupLoginForm";
import "./Navbar.css";
// Removed unused import
// import Auth from "../utils/auth";
// let logo = require("../images/parkapplogo.png");

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  return (
    <>
      <MDBNavbar expand="lg" light style={{ backgroundColor: "#0D47A1", height: '70px' }} className="p-3 mb-2 text-white shadow">
        {/* Replace this with a walter white */}
        <MDBNavbarBrand href="/"><span style={{ fontSize: '2.5rem', color: '#00B0FF' }}>P</span>ark App</MDBNavbarBrand>

        <MDBNavbarNav className="justify-content-end">
          {/* <MDBNavbarItem>
            <Link to="/">
              <MDBNavbarLink active aria-current="page">
                Home
              </MDBNavbarLink>
            </Link>
          </MDBNavbarItem> */}
          <MDBNavbarItem>
            <Link to="/createaspot">
              <MDBNavbarLink className="hover">Host A Spot</MDBNavbarLink>
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link to="/history">
              <MDBNavbarLink className="hover">History</MDBNavbarLink>
            </Link>
          </MDBNavbarItem>
          {/* <MDBNavbarItem>
            <Link to="/list">
              <MDBNavbarLink>List a Spot</MDBNavbarLink>
            </Link>
          </MDBNavbarItem> */}
          {/* Commented out because auth isn't used yet. */}
          {/* {Auth.loggedIn() ? (
            <>
              <MDBNavbarItem>
                <Link to="/saved">
                  <MDBNavbarLink>See Your Spots</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={Auth.logout}>Logout</MDBNavbarLink>
              </MDBNavbarItem>
            </>
          ) : ( */}
          <MDBNavbarItem>
            <MDBNavbarLink className ="hover" onClick={() => setShowModal(true)}>
              Login/Sign Up
            </MDBNavbarLink>
          </MDBNavbarItem>
          {/* )} */}
        </MDBNavbarNav>
      </MDBNavbar>

      {showModal && (
        <MDBModal show={showModal} onHide={closeModal}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>Login/Sign Up</MDBModalHeader>
              <MDBModalBody>
                {/* Render your login/signup form here */}
                <SignupForm closeModal={closeModal} />
                {/* or */}
                {/* <SignUpForm closeModal={closeModal} /> */}
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
};

export default Navbar;
