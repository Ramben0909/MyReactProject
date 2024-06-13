import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const Basic = () => {
  return (
    <div>
       
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Basic;
