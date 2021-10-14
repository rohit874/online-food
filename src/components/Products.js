import {useState,useEffect} from 'react'
import Product from "./Product";
import "../styles/products.css";
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../images/loading_icon.svg';

function Products() {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/restaurant')
        .then((res)=> {
    setProducts(res.data);
   });
    },[])


    return (
        <div className="products_parent">
            <h1 className="restaurants_count">{products.length} restaurants</h1>
            <div className="filter">
            <button className="filter_button">Filter</button>
            <button className="filter_button">Rating</button>
            <button className="filter_button">Delevery Time</button>
            <button className="filter_button">Cost</button>
        </div>
            <div className="products">
            {
                products.length?
                   products.map(product => <Product key={product._id} product={product}/>)
                :<div className="content_loading">
                <LoadingIcon className="content_loading_animation" />
                </div>}
            </div>
        </div>
    )
}

export default Products
