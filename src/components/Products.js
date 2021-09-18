import {useState,useEffect} from 'react'
import Product from "./Product";
import "../styles/products.css";
import axios from 'axios';
function Products() {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get('/api/restaurant')
        .then((res)=> {
    setProducts(res.data);
   });
    },[])



    // const [isActive, setActive] = useState(false);
    // const toggleClass =()=>{
    //     setActive(!isActive);
    // }
    return (
        <div className="products_parent">
            <h1 className="restaurants_count">25 restaurants</h1>
            <div className="filter">
            {/* <button className={isActive ? 'filter_button_seleted': 'filter_button'} onClick={toggleClass}>Filter</button> */}
            <button className="filter_button">Filter</button>
            <button className="filter_button">Rating</button>
            <button className="filter_button">Delevery Time</button>
            <button className="filter_button">Cost</button>
        </div>
            <div className="products">
            {
                   products.map(product => <Product key={product._id} product={product}/>)
                }
                {/* <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product /> */}
            </div>
        </div>
    )
}

export default Products
