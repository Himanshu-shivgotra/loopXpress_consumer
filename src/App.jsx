import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductList from './pages/ProductsList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import SignUp from './pages/Authentication/Signup';
import SignIn from './pages/Authentication/Signin';
import ResetPassword from './pages/Authentication/resetPassword';
import ForgotPassword from './pages/Authentication/forgetPassword';
import CheckOut from './pages/CheckoutPage/CheckOut';
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess';
import OrderTracking from './pages/orderTracking/OrderTracking';
import Orders from './pages/Orders/Orders';

const App = () => {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/auth/signin" />} />
          <Route path="/home" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/orders-tracking" element={<OrderTracking />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
