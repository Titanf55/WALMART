import React, { useEffect, useState } from 'react';
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillLightningFill,
  BsFillTagFill,
  BsFillGiftFill,
  BsFillXCircleFill
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import './Home.css'; // make sure to include this

function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const data = [
    { name: 'Papaya', price: 400, discount: 280 },
    { name: 'Plum', price: 300, discount: 210 },
    { name: 'Onion', price: 200, discount: 140 },
    { name: 'Kiwi', price: 278, discount: 194.6 },
    { name: 'Peas', price: 189, discount: 132.3 },
    { name: 'Garlic', price: 239, discount: 167.3 },
    { name: 'Mango', price: 349, discount: 244.3 }
  ];

  const data1 = [
    { name: 'Papaya', price: 400, sales: 280 },
    { name: 'Plum', price: 300, sales: 210 },
    { name: 'Onion', price: 200, sales: 140 },
    { name: 'Kiwi', price: 278, sales: 194.6 },
    { name: 'Peas', price: 189, sales: 132.3 },
    { name: 'Garlic', price: 239, sales: 167.3 },
    { name: 'Mango', price: 349, sales: 244.3 }
  ];

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card blue'>
          <div className='card-inner'>
            <h3>TOTAL PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>989</h1>
        </div>

        <div className='card orange'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>7</h1>
        </div>

        <div className='card green'>
          <div className='card-inner'>
            <h3>FRESH ITEMS</h3>
            <BsFillLightningFill className='card_icon' />
          </div>
          <h1>323</h1>
        </div>

        <div className='card red'>
          <div className='card-inner'>
            <h3>DISCOUNTED ITEMS</h3>
            <BsFillTagFill className='card_icon' />
          </div>
          <h1>56</h1>
        </div>

        <div className='card purple'>
          <div className='card-inner'>
            <h3>TO BE DONATED</h3>
            <BsFillGiftFill className='card_icon' />
          </div>
          <h1>45</h1>
        </div>

        <div className='card dark'>
          <div className='card-inner'>
            <h3>EXPIRED ITEMS</h3>
            <BsFillXCircleFill className='card_icon' />
          </div>
          <h1>565</h1>
        </div>
      </div>

      {ready && (
        <div className='charts'>
          <div className='chart-box'>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='price' fill='#8884d8' />
                <Bar dataKey='discount' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className='chart-box'>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={data1}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='price' stroke='#8884d8' activeDot={{ r: 8 }} />
                <Line type='monotone' dataKey='sales' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;