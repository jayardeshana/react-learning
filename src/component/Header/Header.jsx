import React, { useState } from 'react';
import '../../Assets/style/Header.css'; // Importing CSS file for styling

const Header = ({onSearchInputChange}) => {

  return (
    <div className="header">
      <div className="left">
        <h1>Covid-19</h1>
      </div>
      <div className="right">
      <input type="text" placeholder="Search Country..." className='search-bar' onChange={onSearchInputChange}/>
        <span>Login</span>
        <span>Signup</span>
        <span>Help & Support</span>
      </div>
    </div>
  );
};

export default Header;
