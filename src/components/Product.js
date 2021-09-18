import React from 'react';
import { Link } from 'react-router-dom';
function Product(props) {
    const { product } = props;
    return (
        <Link to ={`restaurant/${product._id}`}>
        <div className="product">
                    <img src={product.image} alt="" />
                    <div className="product_div1">
                        <h4>{product.name}</h4>
                        <p>{product.rating}<span>&#9733;</span></p>
                    </div>
                    <div className="product_div2">
                        <p>{product.type}</p>
                        <p>&#8377;{product.price} for one</p>
                    </div>
                </div>
                </Link>
    )
}

export default Product;
