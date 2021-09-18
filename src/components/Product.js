import React from 'react';
function Product(props) {
    const { product } = props;
    return (
        <a src={`https://online-food-rohit.herokuapp.com/restaurant/${product._id}`}>
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
                </a>
    )
}

export default Product;
