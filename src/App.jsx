import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
import Profile from './pages/Profile/Profile';

const App = () => {
  const location = useLocation();
  const noNavBarRoutes = ['/auth/signup', '/auth/signin'];

  return (
    <>
      <div>
        <ToastContainer />
        {!noNavBarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/orders-tracking" element={<OrderTracking />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
