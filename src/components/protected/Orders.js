import { NavLink } from 'react-router-dom';
import '../../styles/cart.css';
import { useEffect,useState } from 'react';
import {ReactComponent as LoadingIcon} from '../../images/loading_icon.svg';
import axios from 'axios';

const Orders = ()=>{

const [items, setItems] = useState([]);
const [process, setProcess] = useState(true);

    useEffect(() => {
        var config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
          }};
          axios.get(`https://online-food-backend-api.herokuapp.com/api/order`,config)
            .then(res => {
                setItems(res.data);
                setProcess(false);
            })
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
    }, []);



    return(
        <>
        <div className="cart_parent">
        <div className="cart_button"><NavLink to="/cart"><button>Cart</button></NavLink><NavLink to="/order"><button>Orders</button></NavLink><NavLink to="/delivered"><button>Delivered</button></NavLink></div>
        {
        !process?
        !items.length ? <h2 className="cart_no_found">Nothing in the Order!</h2>
        :
         items.map((items)=>{
            const orderTime = new Date(items.date);
            orderTime.setHours(orderTime.getHours() + 1);
            const time = new Date(orderTime).toLocaleTimeString('en', { timeStyle: 'short', hour12: true, timeZone: 'Asia/Kolkata' });
            return(
            <div className="item" key={items._id}>
            <div className="item_details">
                <img src={items.image} alt="" />
                <div className="item_name">
                    <h3>{items.name}</h3>
                    <p>&#8377;{items.price}</p>
                    <p>Payment method : {items.payment}</p>
                    <p>Status : {items.status}</p>
                    <p className="order_confirm_text">Delivered by {time}</p>
                </div>
            </div>
            <p className="order_address">Address : {items.address}</p>
                {/* <button className="item_cancel_button">Cancel</button> */}
        </div>
            )
        })
    :<div className="content_loading">
    <LoadingIcon className="content_loading_animation" />
    </div>}
        </div>
        </>
    )
}
export default Orders;