//topnavbar
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = () => {
  return (
      <div className='top-navbar'>
        <FontAwesomeIcon icon={faTv} className='icon'/>
        <h2>Following   | <span>For you</span></h2>
        <FontAwesomeIcon icon={faSearch} className='icon'/>
      </div>
  );
};

export default TopNavbar;
