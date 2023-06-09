import React, { useState } from "react";
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

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
// import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

//remember to name ADD_User correctly in utils/mutations.js

// const [validated] = useState(false);

// const handleFormSubmit = async (event) => {
//   event.preventDefault();
//   const form = event.currentTarget;
//   if (form.checkValidity() === false) {
//     event.preventDefault();
//     event.stopPropagation();
//   }
//   try {
//     let userData = await addUser({ variables: userFormData });
//     //note that order of properties in the object does not matter as long as they are correctly named to match the corresponding properties in the source object, i.e our mutation.
//     const { token, user } = userData.data.addUser;
//     Auth.login(token);
//   } catch (err) {
//     console.error(err);
//     setShowAlert(true);
//   }
//   setUserFormData({
//     username: "",
//     email: "",
//     password: "",
//   });
// };

const SignupForm = () => {
  //Alerts for bad inputs, commented out for now.
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false);
  //STATES

  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //MUTATIONS

  //TAB CODE AND STATE
  const [tabActive, settabActive] = useState("Login");

  const handleTabClick = (value) => {
    if (value === tabActive) {
      return;
    }

    settabActive(value);
  };

  //USER LOGIN CODE MUTATION
  const [login, { loginErr, loginData, loginLoading }] =
    useMutation(LOGIN_USER);

  //REGISTER USER CODE MUTATION

  const [doRegisterFormData, { err, data }] = useMutation(ADD_USER);

  //HANDLE LOGIN INPUT

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({ ...userFormData, [name]: value });
  };

  //HANDLE REGISTER INPUT
  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    //updates our register form state
    setRegisterFormData({ ...registerFormData, [name]: value });
    console.log(registerFormData);
  };

  //HANDLE LOGIN SUBMIT
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    //when validity is implemented, turn me back on.
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const response = await login({
        variables: { ...userFormData },
      });
      console.log("Response is: ");
      console.log(response);
      if (!response.ok) {
        throw new Error("User was not found!");
      }
      // when tokens are implemented, turn me back on
      // const { token, user } = await response.json();
      console.log("User is: ");
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }
    //Clear the form.
    setUserFormData({
      email: "",
      password: "",
    });
  };
  //HANDLE REGISTER SUBMIT
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("I got clicked!");
      let { data } = await doRegisterFormData({
        variables: { ...registerFormData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  //JSX SECTION
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {/* TABS */}
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleTabClick("Login")}
            active={tabActive === "Login"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleTabClick("Register")}
            active={tabActive === "Register"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        {/* LOGIN PANE */}

        <MDBTabsPane show={tabActive === "Login"}>
          <form id="loginform" onSubmit={handleLoginSubmit}>
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
          <MDBTabsLink
            onClick={() => handleTabClick("Register")}
            active={tabActive === "Register"}
          >
            Not a memer? Register!
          </MDBTabsLink>
        </MDBTabsPane>

        {/* REGISTRYPANE */}

        <MDBTabsPane show={tabActive === "Register"}>
          <form id="registerform" onSubmit={handleRegisterSubmit}>
            <MDBInput
              name="username"
              label="username"
              id="registerform"
              type="text"
              onChange={handleRegisterInputChange}
              value={registerFormData.username}
            />

            <MDBInput
              name="email"
              label="Email"
              id="registerform"
              type="email"
              onChange={handleRegisterInputChange}
              value={registerFormData.email}
            />

            <MDBInput
              name="password"
              label="Password"
              id="registerform"
              type="password"
              onChange={handleRegisterInputChange}
              value={registerFormData.password}
            />

            <MDBBtn
              className="mb-4 w-100"
              form="registerform"
              onSubmit={doRegisterFormData}
            >
              Sign up
            </MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};
export default SignupForm;
