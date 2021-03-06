import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../styles/restaurant.css';
import { CartContext } from "../CartContext";
import {ReactComponent as LoadingIcon} from '../images/loading_icon.svg';

function Restaurant() {
    const { cart, setCart } = useContext(CartContext);
    const [resInfo, setResInfo] = useState({});
    const [resItems, setResItems] = useState({});
    const {id} = useParams();
    useEffect(() => {
        axios.get(`https://online-food-backend-api.herokuapp.com/api/restaurant/${id}`).then((res) => {
            setResInfo(res.data.resInfo);
            setResItems(res.data);
        })
    },[id]);

    const AddToCart = (product)=>{
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
    const RemoveFromCart = (product)=>{
        let _cart = {...cart};
        if (_cart.items[product.item_id]===1) {
            delete _cart.items[product.item_id];
        }
        else{
            _cart.items[product.item_id] -= 1;
        }
        if (_cart.totalitems>0) {
        _cart.totalitems -= 1; 
        }
        setCart(_cart);
    }

    return (
        <div>
            {!Object.keys(resInfo).length <=0 ?<>
            <div className="res_head">
                <img src={resInfo.image} className="res_head_img" alt="" />
                <div className="res_details">
                    <h2>{resInfo.name}</h2>
                    <p>{resInfo.type}</p>
                    <p>{resInfo.location}</p>
                    <div className="more_info">
                        <div className="more_info1">
                            <h4>
                                <span>&#9733;</span> {resInfo.rating}
                            </h4>
                            <p>50+ Rating</p>
                        </div>
                        <div className="res_divider"></div>
                        <div className="more_info2">
                            <h4>{resInfo.delivery_time}</h4>
                            <p>Delevery time</p>
                        </div>
                        <div className="res_divider"></div>
                        <div className="more_info3">
                            <h4>&#8377;{resInfo.price}</h4>
                            <p>Cost for two</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="res_items_parent">
                <h2 className="order_online">Order Online</h2>
                {
                !resItems.resItems ? <h1>No Product Listed</h1>
                : resItems.resItems.map((items,key) => {
                    return (
                        <div className="item" key={key}>
                            <div className="item_details">
                                <img src={items.image} alt="" />
                                <div className="item_name">
                                    <h3>{items.name}</h3>
                                    <p>&#8377;{items.price}</p>
                                    <p>{items.description}</p>
                                </div>
                            </div>
                            <div className="item_button">
                                {
                                   cart.items && cart.items[items._id]
                               ? <><button className="item_dec_button" onClick={(e)=>{RemoveFromCart({item_id:items._id})}} > - </button>
                               <span>{cart.items[items._id]}</span>
                               <button className="item_inc_button" onClick={(e)=>{AddToCart({item_id:items._id})}} > + </button> 
                               </>
                                : <button onClick={(e)=>{AddToCart({item_id:items._id})}} className="item_Add_button">Add</button>
                }
                            </div>
                        </div>
                    )
                })}
            </div>
            </>:<div className="content_loading">
            <LoadingIcon className="content_loading_animation" />
            </div>}
        </div>
    )
}

export default Restaurant
