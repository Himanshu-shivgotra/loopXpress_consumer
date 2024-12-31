import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductList from './pages/ProductsList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
