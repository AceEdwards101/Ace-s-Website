import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from "./Home.js"
import Products from "./Products"
import ShoppingCart from "./ShoppingCart"
import ProductDetail from './ProductDetail';
import User from './User';
import { useState, useEffect } from 'react';
import Orders from './Orders';

const padding = {
  padding: 5
}

function App() {
  const [cart,setCart]= useState([])
  const baseurl = 'http://localhost:3001'
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart items to local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <nav>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/Products">Products</Link>
          <Link style={padding} to="/ShoppingCart">Shopping Cart</Link>
          <Link style={padding} to="/User">User Profile</Link>
          <Link style={padding} to="/Orders">Orders</Link>
        </nav>

        <Routes>
          <Route path="/User" element={<User />} />
          <Route path="/Products/:productId" element={<ProductDetail />} />
          <Route path="/Products" element={<Products addToCart={addToCart} />} />
          <Route path="/Products/*" element={<Products />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      </header>
      <i>Website created by Ace Edwards</i>
    </div>
  );
}

export default App;
