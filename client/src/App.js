import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import React and Apollo dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// CSS libraries/components/.css files
import { NextUIProvider} from "@nextui-org/react";
import "./App.css";

// Pages
import Home from './pages/Home';  //where all requests within logged in user will be displayed in either a list or map view
import Signup from './pages/Signup';   //where the user will be able to signup
import Login from './pages/Login'; //where the user will be able to login
import Dashboard from './pages/Dashboard'; //where the user will be able to see all requests in a list view
import Request from './pages/Request'; //where a single request will be displayed
import Profile from './pages/Profile'; //where all user's own request will be displayed and where see it in either a list or in calendar view
import NotFound from './pages/NotFound'; //where the user will be redirected to if they try to access a page that does not exist

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
              <Route
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login"
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route 
                path="/request/:requestId"
                element={<Request />} 
              />
              <Route
                path="/user/:username"
                element={<Profile />}
              />
              <Route 
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
    </NextUIProvider>
  );
}

export default App;
