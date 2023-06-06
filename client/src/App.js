import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import Home from "./pages/Home";
// import Update from "./pages/Update";
// import NoMatch from "./pages/NoMatch";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Nav from "./components/Nav";
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
    <p>Hello!</p>
    // <ApolloProvider client={client}>
    //   <Router>
    //     <div>

    //       <Nav />
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/signup" element={<Signup />} />
    //         <Route path="/History" element={<History />} />
    //         <Route path="/products/:id" element={<Detail />} />
    //         <Route path="*" element={<NoMatch />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </ApolloProvider>
  );
}

export default App;
