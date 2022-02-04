import React, { useEffect } from 'react';
import {useCollection} from '../../hooks/useCollection'
import './Products.scss';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { NavLink } from 'react-router-dom';

const Products = () => {


  const { documents, error }= useCollection("products");
  const {addDocument,response}=useFirestore("frequent-item");
  const {dispatch,cart,search,filter}=useAuthContext();

  const addtoCart = (item)=>{
         
      let flag=0;

       if(!cart){
        dispatch({ type: 'ADD_TO_CART', payload: {product:[{item:item.name,quantity: 1,price:item.price,flavour:item.flavour,img:item.imgUrl}],total:item.price} })
       }
      else{
  
       let res=cart.product.map((val)=>{              //all previous selected items of cart
         return val;
       })

       res.forEach((val)=>{
          if(val.flavour===item.flavour){
             flag=1;
             ++val.quantity;
             //console.log(val.quantity);
          }
       })
       
       //console.log(res)
       if(flag===0){
      dispatch({ type: 'ADD_TO_CART', payload: {product: [...res,{item:item.name,quantity: 1,price:item.price,flavour:item.flavour,img:item.imgUrl}],total: Number(cart.total+item.price)} })
       }
       else{
        dispatch({ type: 'ADD_TO_CART', payload: {product: [...res],total: Number(cart.total+item.price)} })
       }
    }
  }

  useEffect(()=>{

   // console.log("s"+search);
 
    //console.log(cart)
  },[search])

  return (
  <div className="products-container">
      <h1>Most Popular Recipes</h1>
      <p id='products-para'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      <div className='popular-items'>
           {
             
             documents && documents.map((item)=>{
               if(filter===null || filter=== undefined || filter==="all" || item.price<=filter){
               if (search === undefined || search === null || search.includes("pizza") && item.name === "Pizza"
                 || search.includes("burger") && item.name === "Burger" || search.includes("pulao") && item.name === "Pulao"
                 || search.includes("biryani") && item.name === "Biryani"
               ){
               return(
                <NavLink to={`/productDetails/${item.id}`} className="card">
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
            }
              
             })
           }
      </div>

  </div>
  )
};

export default Products;
