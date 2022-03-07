import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token; // what is this doing ?
  } else {
    delete axios.defaults.headers.common['x-auth-token']; // if fails, deletes ^
  }
};

export default setAuthToken;
