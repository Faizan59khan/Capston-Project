import React from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';
import {useCollection} from '../../hooks/useCollection';
import Loading from '../../components/Loading'
import './Track.scss'


const Track = () => {

  const {documents,error}=useCollection("purchases");
  const {user}=useAuthContext();

  // useEffect(()=>{
  //     if(user){
  //   console.log("user"+user.uid);
  //   console.log("user"+typeof(user.uid));
  //     }
  // },[])

  return (
  <div className='main-track'>
       <h2>My Orders</h2>
      {
        !documents && <Loading />
      }
      {
          user && documents && documents.map((item)=>{

              if(user.uid===item.transId && item.status[0]==="completed"){
                return(
              
                  <div className='past-order'>
                    <h4>This order has been placed on {item.createdAt.toDate().toDateString()}</h4>
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
                  </div>
            
                )
                
              }
            
              if(user.uid===item.transId && item.status[0]!=="completed"){                       //if current user id matches with the transactions id
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
                      <div className={item.status[0]==="placed" || item.status[0]==="confirmed" || item.status[0]==="preparing"
                         || item.status[0]==="delivered" || item.status[0]==="completed" ?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete"/>
                        <p>Placed<br /></p>
                      </div>
                      <div className={item.status[0]==="confirmed"||item.status[0]==="preparing"
                         || item.status[0]==="delivered" || item.status[0]==="completed"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Confirmed<br /></p>
                      </div>
                      <div className={item.status[0]==="preparing"
                         || item.status[0]==="delivered" || item.status[0]==="completed"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Preparing<br /></p>
                      </div>
                      <div className={item.status[0]==="delivered" || item.status[0]==="completed"?"order-tracking completed":"order-tracking"}>
                        <span className="is-complete" />
                        <p>Delivered<br /></p>
                      </div>
                      <div className={item.status[0]==="completed"?"order-tracking completed":"order-tracking"}>
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
