import React, { useEffect, useState } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/inventory.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const headers = products.length > 0 ? Object.keys(products[0]) : [];

  const filteredProducts = products.filter(product =>
    String(product.Product_Name || '')
      .toLowerCase()
      .includes(String(searchTerm).toLowerCase())
  );

  return (
    <div className="inventory-wrapper">
      <h2>Inventory Table</h2>
      <input
        type="text"
        placeholder="Search by Product Name..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <p className="no-results">No products found.</p>
      ) : (
        <div className="table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                {headers.map((key, i) => (
                  <th key={i}>{key.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item, idx) => (
                <tr key={idx}>
                  {headers.map((key, i) => (
                    <td key={i}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inventory;
