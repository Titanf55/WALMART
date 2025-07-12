import logo from './logo.svg';
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup.jsx';
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Inventory from './pages/Inventory/Inventory';
import Products from './pages/Products';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(""); // blank at first

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      {loggedIn ? (
        <div className="grid-container"> {/* ✅ Required for layout */}
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar 
            openSidebarToggle={openSidebarToggle} 
            OpenSidebar={OpenSidebar}
            onPageChange={setCurrentPage}
          />

          <div className="main-content"> {/* ✅ Main scrollable area */}
            {currentPage === "dashboard" && <Home />}
            {currentPage === "inventory" && <Inventory />}
             {currentPage === "Products" && <Products />}
            {/* Add more pages here if needed */}
          </div>
        </div>
      ) : (
        <LoginSignup onLogin={() => setLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
