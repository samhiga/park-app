import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBAlert,
} from "mdbreact";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //remember to name ADD_User correctly in utils/mutations.js
  const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      let userData = await addUser({ variables: userFormData });
      const { token, user } = userData.data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <MDBAlert color="danger" dismiss>
                Something went wrong with your signup!
              </MDBAlert>

              <MDBInput
                label="Username"
                type="text"
                name="username"
                onChange={handleInputChange}
                value={userFormData.username}
                required
              >
                <div className="invalid-feedback">Username is required!</div>
              </MDBInput>

              <MDBInput
                label="Email"
                type="email"
                name="email"
                onChange={handleInputChange}
                value={userFormData.email}
                required
              >
                <div className="invalid-feedback">Email is required!</div>
              </MDBInput>

              <MDBInput
                label="Password"
                type="password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
              >
                <div className="invalid-feedback">Password is required!</div>
              </MDBInput>

              <MDBBtn
                disabled={
                  !(
                    userFormData.username &&
                    userFormData.email &&
                    userFormData.password
                  )
                }
                color="success"
                type="submit"
              >
                Submit
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default SignupForm;
