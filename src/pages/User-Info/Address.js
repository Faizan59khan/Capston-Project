import React from 'react';
import {useAuthContext} from '../../hooks/useAuthContext'

const Address = () => {
    
    const {user}=useAuthContext();

  return (
  <div>
      <input type="text" placeholder='Add your address' />
  </div>)
};

export default Address;
