import { Link, NavLink } from 'react-router-dom';
import '../styles/cart.css';
import { useState, useEffect, useContext } from 'react'
import { CartContext } from "../CartContext";
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../images/loading_icon.svg';


const Cart = ()=>{

    let subTotal = 0;
    const { cart, setCart} = useContext(CartContext);
    const [ cartItems, setCartItems ] = useState([]);
    const [itemFetched, setItemFetched] = useState(false);

    useEffect(() => {
        window.localStorage.setItem('subtotal', subTotal);
      });

    useEffect(() => {
        if (!cart.items) {
            return;
        }
        if (itemFetched) {
            return;
        }
        let itemsIds =  Object.keys(cart.items)
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
          axios.post(`https://online-food-backend-api.herokuapp.com/api/cart`, {ids:itemsIds}, config)
            .then(res => {
                setItemFetched(true);
                setCartItems(res.data);
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }, [itemFetched,cart]);

    const AddToCart = (e,product)=>{
        let _cart = {...cart};
        if (!_cart.items) {
            _cart.items ={};
        }
        if (_cart.items[product.item_id]) {
            _cart.items[product.item_id] += 1;
        }
        else{
                _cart.items[product.item_id] = 1;
        }
        if (!_cart.totalitems) {
            _cart.totalitems = 0;
        }
        _cart.totalitems += 1; 
        setCart(_cart);
    }

    const RemoveFromCart = (e,product)=>{
        let _cart = {...cart};
        if (_cart.items[product.item_id]===1) {
            delete _cart.items[product.item_id];
        }
        else{
            _cart.items[product.item_id] -= 1;
        }
        if (_cart.totalitems>=0) {
        _cart.totalitems -= 1; 
        }
        setCart(_cart);
    }
        


    return(
        <>
        <div className="cart_parent">
        <div className="cart_button"><NavLink to="/cart"><button>Cart</button></NavLink><NavLink to="/order"><button>Orders</button></NavLink><NavLink to="/delivered"><button>Delivered</button></NavLink></div>
        { cart.totalitems<1 ? <h2 className="cart_no_found">Nothing in the Cart!</h2> 

        : cartItems.length? cartItems.map((items) => {
            if (cart.items[items._id]) {
                subTotal += items.price* cart.items[items._id];
                    return ( <div className="item" key={items._id}>
                    <div className="item_details">
                        <img src={items.image} alt="" />
                        <div className="item_name">
                        <h3>{items.name}</h3>
                            <p>&#8377;{items.price}</p>
                            <p>{items.description}</p>
                        </div>
                    </div>
                    <div className="item_button">
                    <button className="item_dec_button" onClick={(e)=>{RemoveFromCart(e, {item_id:items._id})}}>-</button>
                    <span >{cart.items[items._id]}</span>
                        <button className="item_inc_button" onClick={(e)=>{AddToCart(e, {item_id:items._id})}}>+</button>
                    </div>
                </div>)
                } else{ return ""}
                }):<div className="content_loading">
                <LoadingIcon className="content_loading_animation" />
                </div>
                
                }

{ cart.totalitems>0 ?
                <div className="checkout_button_div">
                    <h3>Subtotal: &#8377;{subTotal}</h3>
                    <Link to="/checkout"><button className="checkout_button">Checkout</button></Link>
                    </div>
                : null
}
        </div>
        </>
    )
}
export default Cart;