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
        await addItems(result);
        await addDocument(cart);


        dispatch({ type: 'ADD_TO_CART', payload: null })
        setDisable(true);
    }

    const removeItem = (item) => {

        let result = [];

        cart.product.forEach((val) => {
            if (val.flavour !== item.flavour) {
                result.push(val);
            }
            else {
                cart.total = cart.total - val.price;         //only remove slected item price from total
                //console.log(cart.total);
                if (val.quantity > 1) {                 //if cart contains more than one item
                    --val.quantity;
                    result.push(val);
                }
            }
        })


        dispatch({ type: 'REMOVE_ITEM', payload: { product: result, total: cart.total } })


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
                                    <h1>{item.item}</h1>
                                    <span>{item.flavour}</span>
                                </div>
                                <p>Quantity: {item.quantity}</p>
                                <div onClick={() => removeItem(item)}><i class="fa-solid fa-xmark"></i></div>
                            </div>
                        )
                    })
                }
                {cart && <div id="cart-total">
                    <h2>Total: {cart.total}</h2>
                    {cart && <label>
                        <span>Location</span>
                        <input type="text" placeholder="Enter Your Address" required onChange={(e) => setLoc(e.target.value)} />
                    </label>

                    }
                </div>
                }
                {!user && cart && <button onClick={checkOut} style={{ background: "gray" }} disabled={true}>Checkout</button>}
                {user && cart && <button onClick={checkOut} disabled={!disable}>Checkout</button>}
            </div>

        </div>
    )
};

export default Cart;
