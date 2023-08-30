import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // State for quantity input

  useEffect(() => {
    console.log('Fetching product for ID:', productId);
    const url = `http://localhost:3001/api/products/${productId}`;
    console.log('Fetching from URL:', url);
  
    axios.get(url)
      .then(response => {
        setProduct(response.data);
        console.log('Product data obtained', response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      // Update the quantity if the item is already in the cart
      const updatedCart = cart.map(item => {
        if (item.productId === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });

      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Add the product to the cart if it's not already there
      const updatedCart = [...cart, { productId: product.id, productTitle: product.title, productPrice: product.price, quantity }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    // Handle success, e.g., show a notification or update the UI
    console.log('Product added to cart:', product);
    console.log('Current cart:', cart);
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.body}</p>
      <p>{product.category}</p>
      <p>{product.tags}</p>
      <p>Price: ${product.price}</p>

      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </label>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;