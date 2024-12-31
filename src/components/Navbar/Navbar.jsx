import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const totalItems = useSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.cartQuantity, 0)
    );

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                {/* Brand Logo */}
                <div className="text-white text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-300">LOOP</Link>
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
                <div
                    className="hidden w-full lg:flex lg:items-center lg:justify-between"
                    id="navbar-menu"
                >
                    <div className="flex space-x-6">
                        <Link to="/home" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/about" className="text-white hover:text-gray-300">
                            About
                        </Link>
                        <Link to="/products" className="text-white hover:text-gray-300">
                            Products
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
                    <div className="flex space-x-4 text-white text-2xl relative">
                        <Link to="/cart" className="hover:text-gray-300 relative">
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-2 -translate-y-2">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <Link to="/profile" className="hover:text-gray-300">
                            <FaUserCircle />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
