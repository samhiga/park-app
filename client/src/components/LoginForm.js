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
import { LOGIN_USER } from "../utils/mutations"; // make sure to create this mutation

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { error, data, loading }] = useMutation(LOGIN_USER);
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
      const { data } = await login({ variables: { ...userFormData } });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
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
              {showAlert && (
                <MDBAlert color="danger" dismiss>
                  Something went wrong with your login credentials!
                </MDBAlert>
              )}

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
                disabled={!(userFormData.email && userFormData.password)}
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

export default LoginForm;
