import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../../redux/slices/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const calculateSubtotal = () =>
        cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.cartQuantity, 0);

    const calculateTotalItems = () =>
        cartItems.reduce((total, item) => total + item.cartQuantity, 0);

    const handleCheckOut = (e) => {
        navigate('/checkout')
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
            <h1 className="text-3xl sm:text-4xl text-center font-bold text-gray-800 mb-4">Shopping Cart</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6">
                You have <span className="font-semibold text-blue-500">{calculateTotalItems()}</span> items in your cart.
            </p>
            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4 sm:space-y-6">
                        {cartItems.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.imageUrls[0] || "https://via.placeholder.com/150"}
                                    alt={item.title || "Product Image"}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                                />
                                {/* Product Details */}
                                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{item.title}</h2>
                                    <p className="text-sm text-gray-500">Brand: {item.brand || "Unknown"}</p>
                                    <p className="text-sm text-gray-500">Stock: {item.quantity || "Not specified"}</p>
                                    {/* Pricing */}
                                    <div className="flex items-center mt-2">
                                        <span className="text-lg font-bold text-blue-600">
                                            ₹{item.discountedPrice || item.price}
                                        </span>
                                        {item.originalPrice && (
                                            <span className="text-sm line-through text-gray-400 ml-2">
                                                ₹{item.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center mt-3">
                                        <button
                                            aria-label="Decrease quantity"
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        id: item.id,
                                                        cartQuantity: Math.max(item.cartQuantity - 1, 1),
                                                    })
                                                )
                                            }
                                            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 text-lg">{item.cartQuantity}</span>
                                        <button
                                            aria-label="Increase quantity"
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        id: item.id,
                                                        cartQuantity: Math.min(item.cartQuantity + 1, item.stock || Infinity),
                                                    })
                                                )
                                            }
                                            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Remove Button */}
                                <button
                                    aria-label="Remove item"
                                    onClick={() => dispatch(removeItem({ id: item.id }))}
                                    className="mt-4 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-600 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="text-lg font-bold text-gray-800">₹{calculateSubtotal()}</p>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-600">Shipping</p>
                            <p className="text-lg font-bold text-gray-800">Free</p>
                        </div>
                        <div className="flex justify-between items-center border-t pt-4">
                            <p className="text-lg sm:text-xl font-semibold text-gray-800">Total</p>
                            <p className="text-lg sm:text-xl font-bold text-blue-600">₹{calculateSubtotal()}</p>
                        </div>
                        <button onClick={handleCheckOut} className="w-full mt-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-sm sm:text-lg font-medium hover:bg-blue-600 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600 text-base sm:text-lg mt-10">
                    Your cart is empty. Start shopping now!
                </p>
            )}
        </div>
    );
};

export default Cart;
