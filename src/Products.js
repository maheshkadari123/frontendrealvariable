import React from 'react';
import './App.css';

const Products = ({ products, addToCart }) => {
  return (
    <div style={{backgroundColor:"white"}}>
      <h1 >Product List</h1>
      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} className="product-image" />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">Price:{item.price}</p>
            <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products;