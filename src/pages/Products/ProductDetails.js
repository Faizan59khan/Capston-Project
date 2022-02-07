import React,{useState} from 'react'
import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import {useAuthContext} from '../../hooks/useAuthContext'
import './Products.scss'
import AprioriAlgo from '../Products/AprioriAlgo'
import Footer from '../../components/Footer'


const ProductDetails = () => {
     // this one
   const [alert, setAlert] = useState(false);
   const [disable,setDisable]=useState(false);
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
      
        setDisable(true);
        let flag=0;
      //these lines
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 1000)
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
      setDisable(false);
    }

  

  return (    <> 
    <div className="alertt" style={{ display: alert ? 'block' : 'none' }}>
      <strong>{document.flavour}</strong> is added to cart.
    </div>
 
    <div className='product-details'>

      <img src={document.imgUrl}/>
      <div className='product-info'>
      <div className='product-price'>
      <h2>{document.flavour}</h2>
      <h2>${document.price}</h2>
      </div>
      <h2>Category</h2>
      <p>{document.category}</p>
      <h2>Details</h2>
      <p>{document.details}</p>

      <button className={disable?"dis-btn":"cart-btn"} onClick={()=> addtoCart(document)} disabled={disable}>Add to Cart</button>
      </div>

    </div>

  <AprioriAlgo/>
  <Footer />
</>)
};

export default ProductDetails;
