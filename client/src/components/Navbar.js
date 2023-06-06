import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBNavbarBrand href="#">Parking App</MDBNavbarBrand>

        <MDBNavbarNav className="justify-content-end">
          <MDBNavItem>
            <Link to="/">
              <MDBNavLink active aria-current="page">
                Home
              </MDBNavLink>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link to="/browse">
              <MDBNavLink>Browse</MDBNavLink>
            </Link>
          </MDBNavItem>
          <MDBNavItem>
            <Link to="/list">
              <MDBNavLink>List a Spot</MDBNavLink>
            </Link>
          </MDBNavItem>
          {Auth.loggedIn() ? (
            <>
              <MDBNavItem>
                <Link to="/saved">
                  <MDBNavLink>See Your Spots</MDBNavLink>
                </Link>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink onClick={Auth.logout}>Logout</MDBNavLink>
              </MDBNavItem>
            </>
          ) : (
            <MDBNavItem>
              <MDBNavLink onClick={() => setShowModal(true)}>
                Login/Sign Up
              </MDBNavLink>
            </MDBNavItem>
          )}
        </MDBNavbarNav>
      </MDBNavbar>

      {showModal && (
        <MDBModal show={showModal} onHide={closeModal}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>Login/Sign Up</MDBModalHeader>
              <MDBModalBody>
                {/* Render your login/signup form here */}
                <LoginForm closeModal={closeModal} />
                {/* or */}
                <SignUpForm closeModal={closeModal} />
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
};

export default Navbar;
