import React from 'react';
import logo from '../assets/writeflow_logo.svg'; // Adjust the path as needed

const Logo = () => {
  return (
  <div className='flex items-center justify-center'>
    <img src={logo} className="w-full h-10 max-w-full" alt="WriteFlow Logo" />
    <h1 className='font-bold text-xl'>Writeflow</h1>
  </div> )
};

export default Logo;
