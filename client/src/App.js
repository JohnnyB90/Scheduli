import React from'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Calendar from './components/Calendar';
import EntryForm from './pages/EntryForm';
import ClientAppointment from './components/ClientAppointment';

import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    
    const token = localStorage.getItem('id_token');
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return(
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/appointment-setup" element={<EntryForm />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path='/' element={<ClientAppointment />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;