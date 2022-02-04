import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import {useAuthContext} from '../../hooks/useAuthContext';
import {useCollection} from '../../hooks/useCollection'
import './Track.scss'


const Track = () => {

  const {documents,error}=useCollection("purchases");
  const {user}=useAuthContext();

  useEffect(()=>{
      if(user){
    console.log("user"+user.uid);
    console.log("user"+typeof(user.uid));
      }
  },[])

  return (
  <div>
       <h2>My Orders</h2>
      {
          user && documents && documents.map((item)=>{
            
              if(user.uid===item.transId && item.status!=="complete"){                       //if current user id matches with the transactions id
              return(
                <div className="track-container">
                       <div className='my-order'>
                           <p>Items</p>
                           <p>Quantity</p>
                           <p>Price</p>
                        </div>
                 
                   {
                     item.product.map((val)=>{
                       return(
                         <div className='my-order'>
                           <p>{val.item}</p>
                           <p>{val.quantity}</p>
                           <p>{val.price}</p>
                        </div>
                          
                       )
                     })
                   }
                   <h4>Total: {item.total}</h4>
                <div className="row track-row">
                  <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                    <div className="row track-row2">
                      <div className={item.status==="placed" || item.status==="confirm" || item.status==="preparing"
                         || item.status==="deliever" || item.status==="complete" ?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete"/>
                        <p>Placed<br /></p>
                      </div>
                      <div className={item.status==="confirm"||item.status==="preparing"
                         || item.status==="deliever" || item.status==="complete"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Confirmed<br /></p>
                      </div>
                      <div className={item.status==="preparing"
                         || item.status==="deliever" || item.status==="complete"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>preparing<br /></p>
                      </div>
                      <div className={item.status==="deliever" || item.status==="complete"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Delievered<br /></p>
                      </div>
                      <div className={item.status==="complete"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Completed<br /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  
               )
              }
          })
      }
     
  </div>)
};

export default Track;
