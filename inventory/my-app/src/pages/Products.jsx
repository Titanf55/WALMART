import React, { useState } from 'react';
import {
  BsFillLightningFill,
  BsFillTagFill,
  BsFillGiftFill,
  BsFillXCircleFill
} from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io'; // Close icon
import './Products.css';

const Products = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleCardClick = async (type) => {
    if (activeTable === type) {
      setActiveTable(null);
      return;
    }

    try {
      const response = await fetch(`/${type}.json`);
      const data = await response.json();
      setTableData(data);
      setActiveTable(type);
    } catch (error) {
      console.error('Error loading table:', error);
    }
  };

  const renderTable = () => {
    if (!tableData || tableData.length === 0) return <p>No data available.</p>;

    const headers = Object.keys(tableData[0]);

    return (
      <div className="table-wrapper">
        <div className="table-header">
          <h3>{activeTable.toUpperCase()} TABLE</h3>
          <IoMdClose className="close-button" onClick={() => setActiveTable(null)} />
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th key={idx}>{header.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {headers.map((key, j) => (
                    <td key={j}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className='products-page'>
      <div className='main-title'>
        <h3>PRODUCTS DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card green' onClick={() => handleCardClick('fresh')}>
          <div className='card-inner'>
            <h3>FRESH ITEMS</h3>
            <BsFillLightningFill className='card_icon' />
          </div>
          <h1>323</h1>
        </div>

        <div className='card orange' onClick={() => handleCardClick('discount')}>
          <div className='card-inner'>
            <h3>DISCOUNTED ITEMS</h3>
            <BsFillTagFill className='card_icon' />
          </div>
          <h1>56</h1>
        </div>

        <div className='card purple' onClick={() => handleCardClick('donation')}>
          <div className='card-inner'>
            <h3>TO BE DONATED</h3>
            <BsFillGiftFill className='card_icon' />
          </div>
          <h1>45</h1>
        </div>

        <div className='card red' onClick={() => handleCardClick('expired')}>
          <div className='card-inner'>
            <h3>EXPIRED ITEMS</h3>
            <BsFillXCircleFill className='card_icon' />
          </div>
          <h1>565</h1>
        </div>
      </div>

      {activeTable && renderTable()}
    </div>
  );
};

export default Products;