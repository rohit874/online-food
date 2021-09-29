/** @format */

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Cart from './components/Cart'
import Home from './components/Home'
import Restaurant from './components/Restaurant'
import Orders from './components/protected/Orders'
import Delivered from './components/protected/Delivered'
import Checkout from './components/protected/Checkout'
import Signup from './components/Signup'
import Login from './components/Login'
import Protected from './components/Protected'
import './styles/Nav.css'
import './styles/home.css'
import cart_img from './images/cart.png'
import search from './images/search.png'
import place from './images/place.png'
import { useState, useEffect } from 'react'
import { CartContext } from './CartContext'

const App = () => {

    const [cart, setCart] = useState({items:{},totalitems:null});
    const [islogIn, setIsLogin] = useState(false);
    const [location, setLocation] = useState("Bijnor");
    useEffect(() => {
      setCart.items=[];
        const cart = window.localStorage.getItem('cart');
        if (cart) {
          setCart(JSON.parse(cart));
          }
          if (localStorage.hasOwnProperty("authToken")) {
              setIsLogin(true);
          }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    var [Forms, setForms] = useState({
        login: false,
        signup: false,
    });

    const LoginForm = () => {
        setForms({ login: true, signup: false })
        document.body.style.overflow = 'hidden'
    }

    const SignupForm = () => {
        setForms({ signup: true, login: false })
        document.body.style.overflow = 'hidden'
    }

    const HideForm = () => {
        setForms({ signup: false, login: false })
        document.body.style.overflow = 'auto'
    }

    const Logout = () => {
        localStorage.removeItem('authToken');
        setIsLogin(false);
    }
    const setLoginState = (set) =>{
        setIsLogin(set);
    }
    
    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart, islogIn }}>
                    <nav>
                        <Link to="/" className="logo">
                            Tomato
                        </Link>
                        <div className="search">
                            <div className="input_1">
                                <img src={place} alt="place" />
                                <input placeholder="Place" onChange={(e)=>setLocation(e.target.value)} value={location}/>
                            </div>
                            <div className="input_divider"></div>
                            <div className="input_2">
                                <img src={search} alt="search" />
                                <input placeholder="Search for restaurant or a dish" />
                            </div>
                        </div>
                        <div className="">
                        { islogIn ? <button onClick={Logout}>Logout</button>:<button onClick={LoginForm}>Sign in</button> }
                            <Link to="/cart">
                                <div className="cart">
                                    <img src={cart_img} alt="cart" />
                                    <span>{cart.totalitems>0 ? cart.totalitems:null }</span>
                                </div>
                            </Link>
                        </div>
                    </nav>
                    {Forms.login ? (
                        <Login hidebtn={HideForm} islogin={setLoginState} signup_btn={SignupForm} />
                    ) : null}
                    {Forms.signup ? (
                        <Signup hidebtn={HideForm} islogin={setLoginState} login_btn={LoginForm} />
                    ) : null}
                    <Switch>
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/cart">
                            <Cart />
                        </Route>
                        <Route
                            path="/restaurant/:id"
                            component={Restaurant}
                        ></Route>
                        <Route path="/order">
                            <Protected  cmp={Orders} LoginForm={LoginForm}/>
                        </Route>
                        <Route path="/delivered">
                        <Protected  cmp={Delivered} LoginForm={LoginForm}/>
                        </Route>
                        <Route path="/checkout">
                        <Protected  cmp={Checkout} LoginForm={LoginForm}/>
                        </Route>
                        <Route path="/signup" component={Signup}></Route>
                        <Route path="/login" component={Login}></Route>
                    </Switch>
                </CartContext.Provider>
            </Router>
        </>
    )
}

export default App
