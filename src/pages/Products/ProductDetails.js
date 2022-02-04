import React,{useState} from 'react'
import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import {useAuthContext} from '../../hooks/useAuthContext'
import './ProductDetails.scss'
import AprioriAlgo from '../Products/AprioriAlgo'
import Footer from '../../components/Footer'


const ProductDetails = () => {
     // this one
  const [alert, setAlert] = useState(false);
    const {id}=useParams();
    const {document,error}=useDocument('products',id);
    const {dispatch,cart,search,filter}=useAuthContext();

    if (error) {
        return <div className="error">{error}</div>
      }
      if (!document) {
        return <div className="loading">Loading...</div>
      }

    const addtoCart = (item)=>{
           
        let flag=0;
      //these lines
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    //
  
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
    }

  

  return (    <> <div class="alertt" style={{ display: alert ? 'block' : 'none' }}>
  <span class="closebtnn" onClick={() => { setAlert(false) }}>&times;</span>
  <strong>{document.flavour}</strong> is added to cart.
</div>
  <div class="ind-item">

    <div className='ind-img'><img src={document.imgUrl} /></div>
    <div className='ind-det'>
      <div className='typo'>
        <h2 className='ind-title'>{document.flavour}</h2>
        <h1 className='ind-price'>${document.price}</h1>
        <h3 className='ind-cat'>{document.category}</h3>
        <p className='ind-detail'>{document.details}</p>
      </div>
      <div className='btnbtn'>
        <button className='ind-addtocart' onClick={() => { addtoCart(document); }}>Add To Cart</button>
      </div>
    </div>





  </div>
  <AprioriAlgo/>
  
  <Footer />
</>)
};

export default ProductDetails;
