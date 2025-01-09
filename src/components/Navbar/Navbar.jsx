import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHome, FaInfoCircle, FaBox, FaClipboardList } from 'react-icons/fa';
import { fetchCartItems } from '../../../redux/slices/cart/cartSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        dispatch(fetchCartItems()).then((action) => {
            setProductData(action.payload);
        });
    }, [dispatch]);

    const calculateTotalItems = () =>
        productData.reduce((total, item) => {
            return total + (item.quantity !== undefined ? item.quantity : 1);
        }, 0);

    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                {/* Brand Logo */}
                <div className="text-white text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-400">LOOP</Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="block lg:hidden">
                    <button
                        className="text-white focus:outline-none"
                        id="navbar-toggle"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    <Link to="/home" className="flex items-center text-white hover:text-gray-400">
                        <FaHome className="mr-1" /> Home
                    </Link>
                    <Link to="/orders-tracking" className="flex items-center text-white hover:text-gray-400">
                        <FaInfoCircle className="mr-1" /> Order Tracking
                    </Link>
                    <Link to="/products" className="flex items-center text-white hover:text-gray-400">
                        <FaBox className="mr-1" /> Products
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-1/3 my-4 lg:my-0">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 pl-10 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                </div>

                {/* User, Cart, and Orders Icons */}
                <div className="flex space-x-4 items-center">
                    <Link to="/cart" className="relative text-white hover:text-gray-400">
                        <FaShoppingCart />
                        {calculateTotalItems() > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-2 -translate-y-2">
                                {calculateTotalItems()}
                            </span>
                        )}
                    </Link>
                    <Link to="/orders" className="text-white ">
                        <FaClipboardList />
                    </Link>
                    <Link to="/profile" className="text-white hover:text-gray-400">
                        <FaUserCircle />
                    </Link>
                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        <Link to="/auth/signin" className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">
                            Sign In
                        </Link>
                        <Link to="/auth/signup" className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;