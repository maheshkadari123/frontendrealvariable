import React, { useState, useEffect } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cart, setCart }) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity,0)
    setSubtotal(total)
  }, [cart])
  const incrementQuantity = (id) => {
    setCart(cart.map((item) => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }
  const decrementQuantity = (id) => {
    setCart(cart.map((item) => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }
  return (
    <div className='cart_empty'>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cart_container'>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <h2 className="cart-title">{item.title}</h2>
              <p className="cart-price">Price:{item.price}</p>
              
              <div className="quantity-selector">
                <IconButton sx={{background:'lightblue','&:hover': {
                   backgroundColor: 'blue',color: 'white',},}} onClick={() => decrementQuantity(item.id)}>
                  <RemoveIcon />
                </IconButton>
                <span>{item.quantity}</span>
                <IconButton sx={{background:'lightblue','&:hover': {backgroundColor: 'blue',color: 'white',},}} onClick={() => incrementQuantity(item.id)}>
                  <AddIcon />
                </IconButton>
              </div>
              <IconButton sx={{background:'lightblue','&:hover':{background:"lightred"}}}onClick={() => deleteItem(item.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <div className="subtotal">
            <h2>Subtotal: {subtotal}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;