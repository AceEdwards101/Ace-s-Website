import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Link
} from 'react-router-dom';



function Products() {
  const [products, setProducts] = useState([]);
  const baseurl= 'http://localhost:3001/api/products'

  useEffect(() => {
    axios.get(baseurl)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const tableRows = [];
  for (let i = 0; i < products.length; i += 6) {
    const row = products.slice(i, i + 6);
    tableRows.push(row);
  }

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(product => (
                <td key={product.id} style={{ textAlign: 'center' }}>
                  <div style={{ maxWidth: '200px', margin: '0 auto', padding: '5px' }}>
                    <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100px' }} />
                    <div style={{ marginTop: '10px' }}></div>
                    <Link to={`/Products/${product.id}`}>{product.title}</Link>
                    <div style={{ marginTop: '10px' }}></div>
                    <strong>${product.price}</strong>
                  </div>
                </td>
              ))}
              {row.length < 6 && <td colSpan={6 - row.length}></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;