import React from 'react'
import { NavLink } from 'react-router-dom';
function Delivered() {
    return (
        <>
                <div className="cart_parent">
                <div className="cart_button"><NavLink to="/cart"><button>Cart</button></NavLink><NavLink to="/order"><button>Orders</button></NavLink><NavLink to="/delivered"><button>Delivered</button></NavLink></div>
        <h2 className="cart_no_found">Nothing delevered yet!</h2>
        </div>
        </>
    )
}

export default Delivered
