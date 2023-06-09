import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SpotDetails from "./pages/SpotDetails";
// import LoginForm from "./components/LoginForm";
// import HelloWorld from "./components/helloworld";
import "mdb-react-ui-kit/dist/css/mdb.dark.min.css";
import SignupLoginForm from "./components/SignupLoginForm";

// import Update from "./pages/Update";
// import NoMatch from "./pages/NoMatch";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// import History from "./pages/History";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/" element={<LoginForm />} /> */}
            <Route path="/" element={<SignupForm />} />
            {/* <Route path="/login" element={<Login />} />

            <Route path="/History" element={<History />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
