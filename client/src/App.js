import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Calendar from "./components/Calendar";
import EntryForm from "./pages/EntryForm";
import ClientAppointment from "./components/ClientAppointment";
import Dashboard from "./pages/Dashboard";
import AdminAppointment from "./components/AdminAppointment";
import authService from "./utils/auth";

import "./App.css";

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
  const [authenticated, setAuthenticated] = useState(authService.loggedIn());

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes>
            {/* Unauthenticated routes available */}
            <Route path="/" element={<EntryForm />} />
            <Route path="/appointment/:userId" element={<ClientAppointment />}/>
            {/* Authenticated Routes */}
            <Route
              path="/calendar"
              element={
                authenticated ? (
                  <Calendar />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/admin-appointment"
              element={
                authenticated ? (
                  <AdminAppointment />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                authenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;

