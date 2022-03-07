import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//styles
import './App.css';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './redux/actions/authAction';
import setAuthToken from './redux/utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // passing an empty array = componentDidMount

  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route exact path='/' element={<Landing />} />
        </Routes>
      </Fragment>
    </Provider>
  );
};

export default App;
