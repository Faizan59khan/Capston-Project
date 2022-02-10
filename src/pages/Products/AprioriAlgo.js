import React, { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';
import './Products.scss'


const AprioriAlgo = () => {
  const [data, setData] = React.useState(null);
  const { documents, error } = useCollection("products");
  const { documents: doc, error: err } = useCollection("itemlist");
  const { cart, dispatch } = useAuthContext();



  useEffect(() => {


    fetch("/api").then((res) => {           //fetching data from node server
      console.log(res)
      return (
        res.json().then((data) => {
          console.log(data.freqItem);
          return (
            setData(data.freqItem)
          )
        })
      )
    })

  }, [cart, doc]);



  return (
    <div className="products-container">
      <h1>You can try these also !</h1>
      <div className='popular-items'>

        {
          data && documents && documents.map((item, index) => {

            let res = [];
            let flag = 0;
            data.forEach((val) => {                           //setting the data that is coming from node server
              //console.log(val.items)                     //freq item array
              cart && cart.product.forEach((cItem) => {      //matching the cart items then show next recommendations a/c to that
                if (val.items.includes(cItem.item)) {
                  flag = 1;
                }
              })
              if (flag === 1) {
                val.items.forEach((value) => {
                  //console.log(value)                      //each value of freq item
                  res.push(value);
                })
                flag = 0;
              }

            })

            if (res.includes(item.name) || res.length === 0) {
              return (
                <NavLink to={`/productDetails/${item.id}`} className="card" key={index}>
                  <img className="card__image" src={item.imgUrl} alt="" />
                  <div className="card__content">
                    <div className="card__header">
                      <h2 className="card__title">{item.name}</h2>
                      <span className="card__price">${item.price}</span>
                    </div>
                    <p className="card__text">{item.details}</p>
                  </div>
                </NavLink>
              )
            }
          })
        }

      </div>
    </div>
  );
}
export default AprioriAlgo;

