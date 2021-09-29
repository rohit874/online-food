import {useState,useEffect} from 'react'
import Product from "./Product";
import "../styles/products.css";
import axios from 'axios';
function Products() {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get('https://online-food-backend-api.herokuapp.com/api/restaurant')
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
                   products.map(product => <Product key={product._id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default Products
