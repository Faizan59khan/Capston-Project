import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore'
import './Cart.scss'

const Cart = () => {

    const [loc, setLoc] = useState("");
    const [disable, setDisable] = useState(true);
    const { dispatch, cart, user } = useAuthContext();
    const { addDocument, response } = useFirestore("purchases")
    const { addDocument: addItems, response: res } = useFirestore("itemlist")

    const checkOut = async () => {

        let result = [];
        setDisable(false);
        cart.transId = user.uid;
        cart.name = user.displayName;
        cart.loc = loc;
        cart.status = "placed";
        // console.log("u"+user.uid+"/n"+cart.transId);
        cart && cart.product.map((val) => {
            result.push(val.item);
        })
        if(cart.loc!==""){
        await addItems(result);
        await addDocument(cart);
        }
        else{
            alert("Enter Your Location")
        }


        dispatch({ type: 'ADD_TO_CART', payload: null })
        setDisable(true);
    }

    const removeItem = (item) => {

        let result = [];
        let total=0;

        cart.product.forEach((val) => {
           if(val !== item){
             result.push(val);
           }
           else{
              for(let i=0;i<item.quantity;i++){                       //remove item prices 
                  cart.total-=item.price;
              }
           }
        })



        dispatch({ type: 'REMOVE_ITEM', payload: { product: result, total: cart.total } })


    }

    const decreaseQuantity=(item)=>{
        cart.product.forEach((val)=>{
            if(val===item){
                if(val.quantity!== 1){
                  val.quantity--;
                  cart.total-=item.price;
                }
            }
        })
        dispatch({ type: 'ADD_TO_CART', payload: {...cart }})
 }

    const increaseQuantity=(item)=>{
           cart.product.forEach((val)=>{
               if(val===item){
                   val.quantity++;
                   cart.total+=item.price;
               }
           })
           dispatch({ type: 'ADD_TO_CART', payload: {...cart }})
    }



    return (
        <div>
            <div className='cart'>
                <h1>Cart</h1>
                {
                    cart && cart.product.map((item, index) => {
                        return (
                            <div className='cart-item' key={index}>
                                <img src={item.img} />
                                <div className='cart-details'>
                                    <h2>{item.item}</h2>
                                    <span>{item.flavour}</span>
                                </div>
                                <div class="qty">
                                        <span class="minus bg-dark" onClick={()=>decreaseQuantity(item)}>-</span>
                                        <input type="number" class="count" name="qty" value={item.quantity}/>
                                        <span class="plus bg-dark" onClick={()=>increaseQuantity(item)}>+</span>
                                </div>
                                <div id='del-item' onClick={() => removeItem(item)}><i className="fa-solid fa-xmark"></i></div>
                            </div>
                        )
                    })
                }
                {cart && cart.product.length!==0 && <div id="cart-total">
                    <h2>Total: {cart.total}</h2>
                    {cart && <div className='location'>
                        <h3>Location</h3>
                        <form>
                        <input type="text" placeholder="Enter Your Address" required onChange={(e) => setLoc(e.target.value)} />
                        </form>
                    </div>

                    }
                </div>
                }
                {!user && cart && cart.product.length!==0 && 
                <button onClick={checkOut} style={{ background: "gray" }} disabled={true}>Checkout</button>}
                {user && cart && cart.product.length!==0 && <button onClick={checkOut} disabled={!disable}>Checkout</button>}
            </div>

        </div>
    )
};

export default Cart;
