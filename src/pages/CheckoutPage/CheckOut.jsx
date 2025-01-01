import React, { useState } from "react";
import { useSelector } from "react-redux";
import { indianStates } from "../../common/constants/mockData";

const CheckOut = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        pincode: "",
        flat: "",
        area: "",
        landmark: "",
        townCity: "",
        state: "",
    });
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "fullName":
                if (!value.trim()) {
                    error = "Full Name is required.";
                }
                break;
            case "mobileNumber":
                if (!/^[0-9]{10}$/.test(value)) {
                    error = "Mobile number must be 10 digits.";
                }
                break;
            case "pincode":
                if (!/^[0-9]{6}$/.test(value)) {
                    error = "Pincode must be 6 digits.";
                }
                break;
            case "flat":
                if (!value.trim()) {
                    error = "Flat, House no., Building, etc., is required.";
                }
                break;
            case "area":
                if (!value.trim()) {
                    error = "Area, Street, Sector, etc., is required.";
                }
                break;
            case "landmark":
                if (!value.trim()) {
                    error = "Landmark is required.";
                }
                break;
            case "townCity":
                if (!value.trim()) {
                    error = "Town/City is required.";
                }
                break;
            case "state":
                if (!value) {
                    error = "State is required.";
                }
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate the field as the user types
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        // If there are any errors, prevent form submission
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Proceed with form submission
        console.log("Form submitted successfully", formData);
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                const price = item.discountedPrice || item.originalPrice || 0;
                return total + price * (item.cartQuantity || 1);
            }, 0)
            .toFixed(2);
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">Checkout</h1>
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
                            <span className="text-orange-500">₹{calculateTotal()}</span>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {Object.keys(formData).map((field) => (
                                <div key={field}>
                                    <label className="block text-gray-700 font-medium capitalize">
                                        {field.replace(/([A-Z])/g, " $1").trim()}
                                    </label>
                                    {field === "state" ? (
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select a state</option>
                                            {indianStates.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field === "mobileNumber" || field === "pincode" ? "text" : "text"}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    )}
                                    {errors[field] && (
                                        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
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
