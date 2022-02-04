import React,{useState,useEffect} from 'react';
import {useCollection} from '../../hooks/useCollection';
import {useAuthContext} from '../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';


const AprioriAlgo = () => {
  const [data, setData] = React.useState(null);
  const {documents,error}=useCollection("products");
  const {documents:doc,error:err}=useCollection("itemlist");
  const {cart,dispatch}=useAuthContext();



  useEffect(() => {
     
    
    fetch("/api").then((res)=>{
      console.log(res)
      return(
        res.json().then((data)=>{
          console.log(data.freqItem);
          return(
            setData(data.freqItem)
          )
        })
      )
    })
  
  }, [cart,doc]);



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

  

  return (
    <div className="products-container">
      <h1>You can try these also !</h1>
    <div className='popular-items'>
         
         {
           data && documents && documents.map((item)=>{

            let res=[];
            let flag=0;  
            data.forEach((val)=>{                           //setting the data that is coming from node server
               //console.log(val.items)                     //freq item array
               cart && cart.product.forEach((cItem)=>{        //matching the cart items then show next recommendations a/c to that
                if(val.items.includes(cItem.item)){
                  flag=1;
                }
              })
              if(flag===1){
                val.items.forEach((value)=>{
                   //console.log(value)                      //each value of freq item
                   res.push(value);       
                })
                flag=0;
               }
  
            })

            if(res.includes(item.name) || res.length===0){
              return(
                <NavLink to={`/productDetails/${item.id}`} className="card">
                <img className="card__image" src={item.imgUrl} alt="" />
                <div className="card__content">
                  <div className="card__header">
                    <h4 className="card__title">{item.name}</h4>
                    <span className="card__price">{item.price}</span>
                    <button onClick={()=>addtoCart(item)}>ADD</button>
                  </div>
                  <p className="card__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,</p>
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

