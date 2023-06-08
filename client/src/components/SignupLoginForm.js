// const SignupForm = () => {
//   const [userFormData, setUserFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   //remember to name ADD_User correctly in utils/mutations.js
//   const [addUser, { error, data, loading }] = useMutation(ADD_USER);
//   const [validated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }
//     try {
//       let userData = await addUser({ variables: userFormData });
//       //note that order of properties in the object does not matter as long as they are correctly named to match the corresponding properties in the source object, i.e our mutation.
//       const { token, user } = userData.data.addUser;
//       Auth.login(token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }
//     setUserFormData({
//       username: "",
//       email: "",
//       password: "",
//     });
//   };
//   return (
//     <div>
//       <MDBTabs pills justify className="mb-3">
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick("login")}
//             active={loginRegisterActive === "login"}
//           >
//             Login
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => handleLoginRegisterClick("register")}
//             active={loginRegisterActive === "register"}
//           >
//             Register
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>
//       <MDBTabsContent>
//         <MDBTabsPane show={loginRegisterActive === "login"}>
//           <form>
//             <div className="text-center mb-3">
//               <p>Sign up with:</p>
//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="facebook-f" />
//               </MDBBtn>
//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="google" />
//               </MDBBtn>
//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="twitter" />
//               </MDBBtn>
//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="github" />
//               </MDBBtn>
//             </div>
//             <p className="text-center">or:</p>
//             <MDBInput
//               className="mb-4"
//               type="email"
//               id="form7Example1"
//               label="Email address"
//             />
//             <MDBInput
//               className="mb-4"
//               type="password"
//               id="form7Example2"
//               label="Password"
//             />
//             <MDBRow className="mb-4">
//               <MDBCol className="d-flex justify-content-center">
//                 <MDBCheckbox
//                   id="form7Example3"
//                   label="Remember me"
//                   defaultChecked
//                 />
//               </MDBCol>
//               <MDBCol>
//                 <a href="#!">Forgot password?</a>
//               </MDBCol>
//             </MDBRow>

//             <MDBBtn type="submit" className="mb-4" block>
//               Sign in
//             </MDBBtn>

//             <div className="text-center">
//               <p>
//                 Not a member? <a href="#!">Register</a>
//               </p>
//             </div>
//           </form>
//         </MDBTabsPane>
//         <MDBTabsPane show={loginRegisterActive === "register"}>
//           <form>
//             <div className="text-center mb-3">
//               <p>Sign up with:</p>

//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="facebook-f" />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="google" />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="twitter" />
//               </MDBBtn>

//               <MDBBtn floating color="secondary" className="mx-1">
//                 <MDBIcon fab icon="github" />
//               </MDBBtn>
//             </div>

//             <p className="text-center">or:</p>

//             <MDBInput className="mb-4" id="form8Example1" label="Name" />
//             <MDBInput className="mb-4" id="form8Example2" label="Username" />
//             <MDBInput
//               className="mb-4"
//               type="email"
//               id="form8Example3"
//               label="Email address"
//             />
//             <MDBInput
//               className="mb-4"
//               type="password"
//               id="form8Example4"
//               label="Password"
//             />
//             <MDBInput
//               className="mb-4"
//               type="password"
//               id="form8Example5"
//               label="Repeat password"
//             />

//             <MDBCheckbox
//               wrapperClass="d-flex justify-content-center mb-4"
//               id="form8Example6"
//               label="I have read and agree to the terms"
//               defaultChecked
//             />

//             <MDBBtn type="submit" className="mb-4" block>
//               Sign in
//             </MDBBtn>
//           </form>
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </div>
//   );
// };

/* <>
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
    </> */

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

// import { useMutation } from "@apollo/client";
// import Auth from "../utils/auth";
// import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
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
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          <p className="text-center">
            Not a member? <a href="#!">Register</a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <MDBInput wrapperClass="mb-4" label="Name" id="form1" type="text" />
          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="form1"
            type="text"
          />
          <MDBInput wrapperClass="mb-4" label="Email" id="form1" type="email" />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
          />

          <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};
export default SignupForm;
//I need to add in logic to not show something if it is not basicActive
//Only show a tab if it is "basic active"
