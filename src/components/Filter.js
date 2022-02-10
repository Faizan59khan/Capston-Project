import React from 'react';
import { useCollection } from '../hooks/useCollection'
import { useAuthContext } from '../hooks/useAuthContext';
import './Filter.scss'


const Filter = () => {

  const { documents, error } = useCollection("products");
  const { dispatch } = useAuthContext();

  const filterPrice = (value) => {
    dispatch({ type: 'Filter', payload: value })
  }


  return (
    <div className='filter'>
      <h1>Filter:</h1>
      <button onClick={() => filterPrice(30)}>Less Price</button>
      <button onClick={() => filterPrice("all")}>All</button>
    </div>)
};

export default Filter;
