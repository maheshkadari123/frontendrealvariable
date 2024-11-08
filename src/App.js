import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Products from './Products'
import Cart from './Cart'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products').then((res)=>res.json())
        setProducts(response)
      } catch (error) {
        const localData = await fetch('/products.json').then((res) => res.json())
        setProducts(localData)
      }
    }
    fetchProducts()
  }, [])
  const addToCart = (prd) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === prd.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === prd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...prd, quantity: 1 }]
      }
    })
    alert(`${prd.title} product is added to the cart successfully`)
   

  }
  

  return (
    <Router>
      <AppBar position="static" sx={{background:"brown"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <Button color="inherit" component={Link} to="/">
              Products
            </Button>
          </Typography>
          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
            <Typography variant="body1">
              Cart [{cart.length}]
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Routes>
        <Route path="/" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;