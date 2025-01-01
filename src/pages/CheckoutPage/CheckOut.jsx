import React from "react";
import { useSelector } from "react-redux";

const CheckOut = () => {
    const cartItems = useSelector((state) => state.cart.items);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.discountedPrice || item.originalPrice || 0;
            return total + price * (item.cartQuantity || 1);
        }, 0).toFixed(2);
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cart Items */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        {cartItems.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center border border-gray-300 rounded-md p-4"
                                    >
                                        <img
                                            src={item.imageUrls?.[0] || "https://via.placeholder.com/100"}
                                            alt={item.title}
                                            className="w-20 h-20 object-cover rounded-md mr-4"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-500">{item.brand || "Unknown Brand"}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.cartQuantity}</p>
                                            <p className="text-orange-500 font-bold">
                                                ₹{(item.discountedPrice || item.originalPrice || 0) * item.cartQuantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-6 text-lg font-semibold text-gray-900 flex justify-between">
                            <span>Total:</span>
                            <span className="text-indigo-600">₹{calculateTotal()}</span>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="10-digit phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Address</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Postal Code</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    pattern="[0-9]{6}"
                                    placeholder="6-digit postal code"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Payment Method</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="credit-card">Credit Card</option>
                                    <option value="debit-card">Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cod">Cash on Delivery</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition-colors font-medium"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
