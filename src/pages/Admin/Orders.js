import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
import "./Purchases.scss"


const Orders = () => {
  const {user,location} =useAuthContext();
  const { documents, error }=useCollection("purchases");
  const {addDocument, updateDocument,response}=useFirestore("purchases");

  

  useEffect(()=>{
      if(user){
    console.log(user.displayName)
    console.log("loc"+location)
      }
  },[user])

  const changeStatus= async (value,item,id)=>{     //change the status of customer
      item.status=value;
      await updateDocument(id,item);
      if(response){
        console.log(response)
      }
  
  }

    return (
    <div className='order'>
        <div>
            <h3>Orders</h3>
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
                <div className='pur-details'>
                    <span>{item.name}</span>
                    <span>{item.loc}</span>
                    <span>{item.status}</span>
                    <p>{item.total}</p>
                    <div className='status'>
                <select name="status" id="state" onChange={(e)=>changeStatus(e.target.value,item,item.id)}>
                    <option value="placed">Placed</option>
                    <option value="confirm">Conifrm</option>
                    <option value="preparing">Preparing</option>
                    <option value="deliever">Delievered</option>
                    <option value="complete">completed</option>
                    
                </select>
        </div>
                </div>
                </div>
                )
            })      
           
        }
        </div>
        
           
    </div>)
};

export default Orders;
