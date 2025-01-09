import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../../../redux/slices/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axiosInstance";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        dispatch(fetchCartItems()).then((action) => {
            const uniqueItems = action.payload.reduce((acc, item) => {
                const existingItem = acc.find(i => i.productId._id === item.productId._id);
                if (existingItem) {
                    existingItem.quantity = item.quantity;
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
            console.log("Unique items:", uniqueItems);
            setProductData(uniqueItems);
        });
    }, [dispatch]);

    useEffect(() => {
        console.log("Cart updated:", productData);
    }, [productData]);

    const calculateTotalItems = () =>
        productData.reduce((total, item) => {
            return total + (item.quantity !== undefined ? item.quantity : 1);
        }, 0);

    const handleCheckOut = () => {
        navigate('/checkout');
    };


    const handleRemoveItem = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/consumers/cart/${id}`);
            setProductData(response.data.cart);
            console.log("Updated cart:", response.data.cart);
        } catch (error) {
            console.error("Could not remove item from cart:", error);
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            const response = await axiosInstance.put('/api/consumers/cart/update', { productId: id, quantity });
            const updatedCart = productData.map(item =>
                item.productId._id === id ? { ...item, quantity } : item
            );
            console.log("Updated cart:", updatedCart);
            setProductData(updatedCart);
        } catch (error) {
            console.error("Could not update quantity:", error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
            <div className="max-w-6xl mx-auto bg-white rounded shadow-lg p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl text-center font-bold text-gray-800 mb-4">Shopping Cart</h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
                    You have <span className="font-semibold text-blue-500">{calculateTotalItems()}</span> items in your cart.
                </p>
                {productData.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4 sm:space-y-6">
                            {productData.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                                >
                                    {/* Product Image */}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productId.title || "Product Image"}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                                    />
                                    {/* Product Details */}
                                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                            {item.productId.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                                        <p className="text-sm text-gray-500">
                                            Stock: {item.quantity || "Not specified"}
                                        </p>
                                        {/* Pricing */}
                                        <div className="flex items-center mt-2">
                                            <span className="text-lg font-bold text-blue-600">
                                                ₹{item.price}
                                            </span>
                                        </div>
                                        {/* Quantity Controls */}
                                        <div className="flex items-center mt-3">
                                            <button
                                                aria-label="Decrease quantity"
                                                onClick={() =>
                                                    handleUpdateQuantity(item.productId._id, Math.max(item.quantity - 1, 1))
                                                }
                                                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="mx-4 text-lg">{item.quantity}</span>
                                            <button
                                                aria-label="Increase quantity"
                                                onClick={() =>
                                                    handleUpdateQuantity(item.productId._id, item.quantity + 1)
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
                                        onClick={() => handleRemoveItem(item._id)}
                                        className="mt-4 sm:mt-0 sm:ml-4 text-red-500 hover:text-red-600 text-sm"
                                    >
                                        {/* Remove */}
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Order Summary */}
                        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg shadow-md p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Price Details</h2>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-600">Total Items</p>
                                <p className="text-lg font-bold text-gray-800">{calculateTotalItems()}</p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-600">Total Price</p>
                                <p className="text-lg font-bold text-blue-600">
                                    ₹{productData.reduce((total, item) => total + item.price * item.quantity, 0)}
                                </p>
                            </div>
                            <button
                                onClick={handleCheckOut}
                                className="w-full mt-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-sm sm:text-lg font-medium hover:bg-blue-600 transition"
                            >
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
        </div>
    );
};

export default Cart;
