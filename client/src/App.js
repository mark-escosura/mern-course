import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
//styles
import './App.css';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';

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
      <>
        <Routes>
          <Route exact path='/' element={<Navbar />}>
            <Route index path='/' element={<Landing />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='create-profile' element={<CreateProfile />} />
              <Route path='edit-profile' element={<EditProfile />} />
            </Route>
          </Route>
        </Routes>
      </>
    </Provider>
  );
};

export default App;
