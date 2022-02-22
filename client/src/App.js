import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
//styles
import './App.css';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Landing />} />
      </Routes>
    </Fragment>
  </Provider>
);

export default App;
