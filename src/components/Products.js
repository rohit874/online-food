import {useState,useEffect} from 'react'
import Product from "./Product";
import "../styles/products.css";
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../images/loading_icon.svg';
function Products() {
    const [products,setProducts] = useState([]);
    const [filterClass, setFilterClass] = useState({
        name:"filter_button",
        rating:"filter_button",
        price:"filter_button"
    })

    useEffect(()=>{
        axios.get('https://online-food-backend-api.herokuapp.com/api/restaurant')
        .then((res)=> {
    setProducts(res.data);
   });
    },[])
    function SortRestaurant(sortBy){
           let sorted;
           if (sortBy==="rating") {
            setFilterClass({name:"filter_button",rating:"filter_on",price:"filter_button"})
            sorted =  products.sort((a,b)=>(a[sortBy]<b[sortBy])?1:((b[sortBy]<a[sortBy])?-1:0));
           }
           else{
               sorted =  products.sort((a,b)=>(a[sortBy]>b[sortBy])?1:((b[sortBy]>a[sortBy])?-1:0));
               sortBy==="price"?setFilterClass({name:"filter_button",rating:"filter_button",price:"filter_on"}):
               setFilterClass({name:"filter_on",rating:"filter_button",price:"filter_button"})
           }
           
           setTimeout(() => {
               setProducts([]);
               setProducts(sorted);
           }, 0);
    }


    return (
        <div className="products_parent">
            <h1 className="restaurants_count">{products.length} restaurants</h1>
            <div className="filter">
            {/* <button style={{cursor:"default"}} className="filter_button">Sort By <FilterIcon className="filter_icon" /></button> */}
            <button onClick={()=>SortRestaurant("name")} className={filterClass.name}>Name</button>
            <button onClick={()=>SortRestaurant("rating")} className={filterClass.rating}>Rating</button>
            <button onClick={()=>SortRestaurant("price")} className={filterClass.price}>Cost</button>
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
