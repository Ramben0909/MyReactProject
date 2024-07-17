import React from 'react';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';

const Basic = () => {
  return (
    <div>
       <Header/>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Basic;
