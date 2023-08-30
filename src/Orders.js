import React, { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]); // State to store fetched orders

  useEffect(() => {
    axios.get('http://localhost:3001/api/orders')
      .then(response => {
        const filteredOrders = response.data.filter(order => order.id  && order.order_date && order.order_total);
        setOrders(filteredOrders);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              Order ID: {order.id}, Order Date: {order.order_date}, Total: ${order.order_total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
