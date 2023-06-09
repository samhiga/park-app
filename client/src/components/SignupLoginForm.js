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
// import { ADD_USER } from "../utils/mutations";

//remember to name ADD_User correctly in utils/mutations.js
// const [addUser, { error, data, loading }] = useMutation(ADD_USER);

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
  //
  //TAB CODE
  const [tabActive, settabActive] = useState("Login");

  const handleTabClick = (value) => {
    if (value === tabActive) {
      return;
    }

    settabActive(value);
  };
  //USER LOGIN CODE
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  //Save inputs to usestate.

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const sayHi = (event) => {
    event.preventDefault();
    console.log("Hi!");
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    //when validity is implemented, turn me back on.
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    console.log("I got clicked!");
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
  //On change handler
  //So that I can record my inputs and send them to the backend via a mutation of some kind.

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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
        <MDBTabsPane show={tabActive === "Login"}>
          <form id="loginform" onSubmit={handleLoginSubmit}>
            <MDBInput
              name="email"
              label="Email address"
              id="loginformInput"
              type="email"
              onChange={handleLoginInputChange}
              value={userFormData.email}
              required
            />
            <MDBInput
              name="password"
              label="Password"
              id="loginformInputFormInput"
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

        <MDBTabsPane show={tabActive === "Register"}>
          <MDBInput
            label="Username"
            id="usernameregisterformInput"
            type="text"
          />
          <MDBInput label="Email" id="emailregisterformInput" type="email" />
          <MDBInput
            label="Password"
            id="passwordregisterformInput"
            type="password"
          />

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};
export default SignupForm;
