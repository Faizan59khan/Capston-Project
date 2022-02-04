import React, { useEffect, useState } from 'react';
import {useCollection} from '../../hooks/useCollection'
import './Products.scss';
import { useAuthContext } from '../../hooks/useAuthContext';


const ProductAssociation = () => {

  const { documents, error }= useCollection("products");
  const {dispatch,cart,search}=useAuthContext();
  const [association,setAssociation]=useState([]);
 
  useEffect(()=>{
    let result=[];

    if(cart){
    let res=cart.product.map((val)=>{                 //all previous selected items of cart
      return val;
    })

    res.map((item)=>{
      console.log(item.item)
       result.push(item.item);
    })

    
  }

  },[])
   



  return (
   <div>
        {
         
        }

     
      
  </div>)
};

export default ProductAssociation;
