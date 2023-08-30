import React, { useState, useEffect } from "react";
import axios from "axios";


function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [newOrderIDs, setNewOrderIDs] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
 
    axios.get('http://localhost:3001/api/orders')
    .then(response => {
      const orderIds = response.data.map(order => order.id);
      setNewOrderIDs(orderIds);
    })
    .catch(error => {
      console.error('Error fetching existing order IDs:', error);
    });

    axios.get(`http://localhost:3001/api/session`)
    .then(sessionResponse => {
      console.log('Session data:', sessionResponse.data);
      setUserId(sessionResponse.data.user_id); // Set userId here
    })
    .catch(error => {
      console.error('Error fetching session:', error);
    });
}, []);


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.quantity * item.productPrice;
    }
    return totalPrice;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1; // Months are 0-indexed
    const year = d.getFullYear();
    return `${year}/${month}/${day}`;
  };

  const submitOrder = () => {
    const newOrderId = Math.max(...newOrderIDs) + 1;
    // Prepare the order data
    const orderData = {
      id: newOrderId,
      user_id: userId, // Replace with the actual user ID
      order_date: formatDate(new Date()),
      order_total: calculateTotalPrice(),
      order_items: cart.map(item => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.productPrice
      }))
    };
    axios.post('http://localhost:3001/api/orders', orderData)
      .then(response => {
        // Clear the cart after submitting the order
        localStorage.removeItem('cart');
        console.log('Order submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      });
  };
  
  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };
  
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                Product: {item.productTitle}, Quantity: {item.quantity}, Price: ${item.quantity * item.productPrice}
                <button onClick={() => handleUpdateQuantity(index, item.quantity - 1)}>-</button>
                <button onClick={() => handleUpdateQuantity(index, item.quantity + 1)}>+</button>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Cart Price: ${calculateTotalPrice()}</p>
          <button onClick={submitOrder}>Submit Order</button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;