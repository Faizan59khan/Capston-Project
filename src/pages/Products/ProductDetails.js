import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import {useAuthContext} from '../../hooks/useAuthContext'
import './Products.scss'
import AprioriAlgo from '../Products/AprioriAlgo'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'
import useWebAnimations, {backInRight,backInLeft} from "@wellyshen/use-web-animations";


const ProductDetails = () => {
     
  const { ref } = useWebAnimations({...backInRight})
  const [alert, setAlert] = useState(false);
  const [disable, setDisable] = useState(false);
  const { id } = useParams();
  const { document, error } = useDocument('products', id);
  const { dispatch, cart} = useAuthContext();

   
   


    if (error) {
        return <div className="error">{error}</div>
      }
      if (!document) {
        return <Loading />
      }

    const addtoCart = (item)=>{
      
        setDisable(true);
        let flag=0;
  
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    
  
         if(!cart){
          dispatch({ type: 'ADD_TO_CART', payload: {product:[{item:item.name,quantity: 1,price:item.price,flavour:item.flavour,img:item.imgUrl,category:item.category}],total:item.price} })
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
        dispatch({ type: 'ADD_TO_CART', payload: {product: [...res,{item:item.name,quantity: 1,price:item.price,flavour:item.flavour,img:item.imgUrl,category:item.category}],total: Number(cart.total+item.price)} })
         }
         else{
          dispatch({ type: 'ADD_TO_CART', payload: {product: [...res],total: Number(cart.total+item.price)} })
         }
      }
      setDisable(false);
    }

  

  return (    <> 
    <div className="alertt" style={{ display: alert ? 'block' : 'none' }}>
    <button type="button" class="close" data-dismiss="alert" onClick={()=>setAlert(false)} aria-hidden="true">×</button>
      <div className='alert-message'>
      <i class="fa-solid fa-check"></i>
      <strong>{document.flavour} <p> is added to cart.</p> </strong> 
      </div>
    </div>
 
    <div className='product-details'>

      <img src={document.imgUrl} />
      <div className='product-info' ref={ref}>
        <div className='product-price'>
          <h2>{document.flavour}</h2>
          <h2>${document.price}</h2>
        </div>
        <h2>Category</h2>
        <p>{document.category}</p>
        <h2>Details</h2>
        <p>{document.details}</p>

        <button className={disable ? "dis-btn" : "cart-btn"} onClick={() => addtoCart(document)} disabled={disable}>Add to Cart</button>
      </div>

    </div>

  <AprioriAlgo/>
  <Footer />
</>)
};

export default ProductDetails;
