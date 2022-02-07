import React from 'react';
import './App.css';

// components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
};

export default App;
