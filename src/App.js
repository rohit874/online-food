import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cart from './components/Cart';
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Orders from './components/protected/Orders';
import Delivered from './components/protected/Delivered';
import Checkout from './components/protected/Checkout';
import Signup from './components/Signup';
import Login from './components/Login';
import Protected from './components/Protected';
import Nav from './components/Nav';
import './styles/home.css';
import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';

const App = () => {
    const [cart, setCart] = useState({items:{},totalitems:null});
    const [subTotal, setSubTotal] = useState(0);
    const [islogIn, setIsLogin] = useState(false);

    useEffect(() => {
      setCart.items=[];
        const cart = window.localStorage.getItem('cart');
        if (cart) {
          setCart(JSON.parse(cart));
          }
          if (localStorage.hasOwnProperty("authToken")) {
            var config = {
                headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${window.localStorage.getItem('authToken')}`
              }};
            axios.get(`https://online-food-backend-api.herokuapp.com/api/getuser`,config)
            .then(res => {
                setIsLogin(true);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status===401) {
                Logout(); 
                }
            });
          }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

    const [Forms, setForms] = useState({
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
        HideForm();
    }
    
    return (
        <>
            <Router>
                <CartContext.Provider value={{ cart, setCart, islogIn, setIsLogin, subTotal, setSubTotal }}>
                    <Nav
                    LoginForm={LoginForm}
                    islogIn={islogIn}
                    Logout={Logout}
                    cart={cart}
                    />

                    {Forms.login ? (
                        <Login HideForm={HideForm} setLoginState={setLoginState} SignupForm={SignupForm} />
                    ) : null}
                    {Forms.signup ? (
                        <Signup HideForm={HideForm} setLoginState={setLoginState} LoginForm={LoginForm} />
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
                            <Protected islogIn={islogIn}  cmp={Orders} LoginForm={LoginForm}/>
                        </Route>
                        <Route path="/delivered">
                        <Protected islogIn={islogIn}  cmp={Delivered} LoginForm={LoginForm}/>
                        </Route>
                        <Route path="/checkout">
                        <Protected islogIn={islogIn}  cmp={Checkout} LoginForm={LoginForm}/>
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
