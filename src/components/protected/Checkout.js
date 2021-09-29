import { React, useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router';
import { CartContext } from "../../CartContext";

function Checkout() {
    const history = useHistory();
    const grandTotal = window.localStorage.getItem('subtotal');
    const { cart, setCart} = useContext(CartContext);
    const [address,setAddress] = useState("");
    const [addressErr,setAddressErr] = useState("");
    const [allAddress, SetAllAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const pay = "COD";
    const data = {pay,address:selectedAddress};

    const changeAddress = () =>{
      if (address.length<10) {
        setAddressErr("Please provide a valid address..lenght should be >10");
        return;
      }
      setAddressErr("");
      setAddress("");
      ShowHideAddress();
      SetAllAddress([...allAddress,address]);
    }
    const selectAddress = (e) =>{
      setSelectedAddress(e.target.value);
    }
    useEffect(() => {
      //redirect user if user want to visit this page without adding items in cart
      const totali = localStorage.getItem('cart');
     if (!localStorage.hasOwnProperty("cart")|| JSON.parse(totali).totalitems<1 || !localStorage.hasOwnProperty("subtotal")) {
      history.push('/')
       return;
     }
    })

    const placeOrder = () => {
        if (!cart.items) {
            return;
        }
        if (data.address==="") {
        setAddressErr("Please select address...");
          return;
        }
        fetch('https://online-food-backend-api.herokuapp.com/api/checkout',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({items:cart.items, data})
        }).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.statusText);
            }
          })
          .then((responseJson) => {
            //clear cart
            localStorage.removeItem('cart')
            localStorage.removeItem('subtotal')
            setCart({items:{},totalitems:null});
            history.push('/cart')
          })
          .catch((error) => {
            console.log(error)
          });
    };
    //show and hide the address input
    const [Address_input,setAddress_input] = useState(false);
    const ShowHideAddress = ()=>{
        setAddress_input(!Address_input);
    }

    return (
        <>
        <div className="checkout">
        <div className="grand_total"><h4>Grand total</h4><h4>&#8377;{grandTotal}</h4></div>
        <div className="checkout_divider"></div>
        <p className="error">{addressErr}</p>
        <h5 className="checkout_heading">Select Address : </h5>
        {
          allAddress.map((address,key)=>{
            return(
              <div className="select_address" key={key}>
              <input onChange={(e)=>{selectAddress(e)}} type="radio" name="address" value={address} />
              <label>{address}</label>
              </div>
            )
          })

        }

        <button className="add_new_add" onClick={ShowHideAddress}>Add New Address</button>
        <div style={{display: Address_input ? "flex" : "none"}} className="add_address">
        <textarea placeholder="Write Full Address" onChange={(e)=>setAddress(e.target.value)} value={address}></textarea>
        <button onClick={changeAddress}>Add</button>
        </div>

        <div className="checkout_divider"></div>
        <h5 className="checkout_heading">Payment options : </h5>
        <div className="input_method_div">
        <div className="select_pay">
        <input type="radio" id="COD" name="input_method" value="COD" defaultChecked={true} />
        <label>Cash On Delivery</label>
        </div>

        <div className="select_pay">
        <input type="radio" id="debit_credit" name="input_method" value="debit_credit" disabled={true} />
        <label>Debit & Credit Cards</label>
        </div>

        <div className="select_pay">
        <input type="radio" id="netbanking" name="input_method" value="netbanking" disabled={true} />
        <label>Netbanking</label>
        </div>

        <div className="select_pay">
        <input type="radio" id="wallet" name="input_method" value="wallet" disabled={true} />
        <label>Wallets</label>
        </div>
        
        <div className="select_pay">
        <input type="radio" id="UPI" name="input_method" value="UPI" disabled={true} />
        <label>UPI</label>
        </div>

        </div>
        <div className="checkout_button_div"><button className="checkout_button" onClick={placeOrder}>Place order</button></div>
        </div>
        </>
    )
}

export default Checkout
