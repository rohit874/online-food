import { NavLink } from 'react-router-dom';
import '../../styles/cart.css';
import { useEffect,useState } from 'react';

const Orders = ()=>{

const [items, setItems] = useState([]);


    useEffect(() => {

        fetch('http://localhost:5000/api/order',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
            }
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.statusText);
            }
          })
          .then((res) => {
              setItems(res);
          })
          .catch((error) => {
            console.log(error)
          });
    }, []);



    return(
        <>
        <div className="cart_parent">
        <div className="cart_button"><NavLink to="/cart"><button>Cart</button></NavLink><NavLink to="/order"><button>Orders</button></NavLink><NavLink to="/delivered"><button>Delivered</button></NavLink></div>
        {
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
    }
        </div>
        </>
    )
}
export default Orders;