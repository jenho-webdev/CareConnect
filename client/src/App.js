import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import React and Apollo dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// CSS libraries/components/.css files
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";

// Pages

//import Home from "./pages/Home"; //where all requests within logged in user will be displayed in either a list or map view
import Signup from "./pages/Signup"; //where the user will be able to signup
import Login from "./pages/Login"; //where the user will be able to login
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard"; //where the user will be able to see all requests in a list view
import Request from "./pages/Request"; //where a single request will be displayed
import Profile from "./pages/Profile"; //where all user's own request will be displayed and where see it in either a list or in calendar view
import NotFound from "./pages/NotFound"; //where the user will be redirected to if they try to access a page that does not exist
import RequestsCalendar from "./components/calendar/RequestsCalendar"; //where the user will be able to see all requests in a calendar view
import CreateRequest from "./components/RequestForm"; //where the user will be able to see all requests in a calendar view
import RequestList from "./components/RequestList"; //where the user will be able to see all requests in a calendar view

// Styles
import "./styles/main.sass";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      //If a token exists, it's included as a bearer token in the request headers.
      //if not, return an empty string as the token.
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Create an instance of Apollo Client by combining the authLink and httpLink using the concat method. This configured
//client will use the specified HTTP link and add the authorization header for authenticated requests.

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the authentication link and HTTP link
  cache: new InMemoryCache(), // Use an in-memory cache to store GraphQL data
});

function App() {
  return (
    // Wrap NextUIProvider at the root of your app
    <NextUIProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <div className="container">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/request/:requestId" element={<Request />} />
                <Route path="/user/:username" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/calendar" element={<RequestsCalendar />} />
                <Route path="/createrequest" element={<CreateRequest />} />
                <Route path="/RequestList" element={<RequestList />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </NextUIProvider>
  );
}

export default App;