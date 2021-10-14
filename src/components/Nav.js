import { Link } from 'react-router-dom';
import '../styles/Nav.css';
import '../styles/home.css';
import cart_img from '../images/cart.png';
import search from '../images/search.png';
import place from '../images/place.png';
import { useState } from 'react';
import axios from 'axios';

function Nav({cart,Logout, islogIn, LoginForm }) {
    const [location, setLocation] = useState("Bijnor");
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchBox, setSearchBox] = useState(false);

    const SearchRestaurant = async (e) =>{
        let quary = e.target.value;
        if (quary==="") {
            return
        }
        await axios.get(`http://localhost:5000/api/search/${quary}`)
        .then((res)=> {
            setSearchResult(res.data.result)
            console.log(res.data);
   });
    }

    const searchBoxOff = ()=>{
        setTimeout(() => {
            setSearchBox(false)
        }, 400);
    }

    return (
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
                    <input onFocus={()=>setSearchBox(true)} onBlur={searchBoxOff} onChange={(e)=>{setSearchInput(e.target.value);SearchRestaurant(e)}} value={searchInput} placeholder="Search for restaurant or a dish" />
                </div>
                <div style={{display:searchBox?"block":"none"}} className="search_div">
                    {
                        searchResult.length?
                        searchResult.map((data)=>{
                            return(
                            <Link key={data._id} to={`/restaurant/${data._id}`} className="serach_items">
                            <img src={data.image} alt="" />
                            <div>
                                <h4>{data.name}</h4>
                                <p>{data.type}</p>
                                <span>{data.rating}<span>&#9733;</span></span>
                            </div>
                        </Link>
                            )
                        }):<p className="no_result">No result found</p>
                    }
                </div>
            </div>
            <div className="nav_right">
            { islogIn ? <button onClick={Logout}>Logout</button>:<button onClick={LoginForm}>Sign in</button> }
                <Link to="/cart">
                    <div className="cart">
                        <img src={cart_img} alt="cart" />
                        <span>{cart.totalitems>0 ? cart.totalitems:null }</span>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
