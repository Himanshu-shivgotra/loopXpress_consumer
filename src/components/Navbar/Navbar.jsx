import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaHome, FaInfoCircle, FaBox } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const totalItems = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.cartQuantity, 0)
    );

    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                {/* Brand Logo */}
                <div className="text-white text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-400">LOOP</Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                    <Link to="/home" className="flex items-center text-white hover:text-gray-400">
                        <FaHome className="mr-1" /> Home
                    </Link>
                    <Link to="/about" className="flex items-center text-white hover:text-gray-400">
                        <FaInfoCircle className="mr-1" /> About
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

                {/* User and Cart Icons */}
                <div className="flex space-x-4 items-center">
                    <Link to="/cart" className="relative text-white hover:text-gray-400">
                        <FaShoppingCart />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-2 -translate-y-2">
                                {totalItems}
                            </span>
                        )}
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
