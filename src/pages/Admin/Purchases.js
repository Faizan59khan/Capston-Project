import React from 'react';
import './Purchases.scss'
import {useCollection} from '../../hooks/useCollection'
import { useEffect } from 'react/cjs/react.development';

const Purchases = () => {

    const{documents,error}=useCollection("purchases");

    // useEffect(()=>{

    //   //console.log("d"+documents);
    // },[!documents])

  return (
  <div className='purchases'>
      <h1>Purchases</h1>
        {
            documents && documents.map((item)=>{
                return(
                    <div className='purchases-item'>{
                    item.product.map((val)=>{
                        return(
                            <div className='purchase-each'>
                               <h3>{val.item}</h3>
                                <span>{val.flavour}</span>
                                <span>{val.quantity}</span>
                            </div>   
                        )
                    })
                }
                <p>{item.total}</p>
                </div>
                )
            })
            
            
           
        }
  </div>
  )
};

export default Purchases;
