import { useState } from "react";
import { useSelector } from "react-redux";
import { indianStates } from "../../common/constants/mockData";
import axiosInstance from "../../common/axiosInstance";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
    const navigate = useNavigate();
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
    const [showSummary, setShowSummary] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentFailure, setPaymentFailure] = useState(false);

    const validateField = (name, value) => {
        let error = "";
        if (!value) {
            error = `${name.replace(/([A-Z])/g, " $1").trim()} is required`;
        } else if (name === "mobileNumber" && !/^\d{10}$/.test(value)) {
            error = "Invalid mobile number";
        } else if (name === "pincode" && !/^\d{6}$/.test(value)) {
            error = "Invalid pincode";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value) });
    };

    const fetchRazorpayKey = async () => {
        const response = await axiosInstance.get("/api/getkey");
        return response.data.key;
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                const price = item.discountedPrice || item.originalPrice || 0;
                return total + price * (item.cartQuantity || 1);
            }, 0)
            .toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setShowSummary(true);
        }
    };

    const handlePayment = async () => {
        try {
            const orderResponse = await axiosInstance.post("/api/payment/checkout", {
                amount: calculateTotal(),
            });

            const { order } = orderResponse.data;
            if (!order) {
                console.error("Order creation failed.");
                return;
            }

            const key = await fetchRazorpayKey();
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                order_id: order.id,
                name: "Loopxpress",
                description: "Order Payment",
                image: "https://loopxpress.vercel.app/assets/looplogo-1b30dddd.png",
                handler: async (response) => {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        amount: order.amount / 100,
                        currency: "INR",
                        items: cartItems.map(item => ({
                            title: item.title,
                            brand: item.brand,
                            category: item.category,
                            subcategory: item.subcategory,
                        }))
                    };

                    try {
                        const paymentResponse = await axiosInstance.post(
                            "/api/payment/paymentverification",
                            paymentData
                        );

                        console.log("Payment verification response:", paymentResponse.data);

                        if (paymentResponse.data.success) {
                            setPaymentSuccess(true);
                            setTimeout(() => {
                                setPaymentSuccess(false);
                                navigate("/products");
                            }, 3000);
                        } else {
                            setPaymentFailure(true);
                            setTimeout(() => setPaymentFailure(false), 3000);
                        }
                    } catch (verificationError) {
                        console.error("Verification error:", verificationError);
                        setPaymentFailure(true);
                        setTimeout(() => setPaymentFailure(false), 3000);
                    }
                },
                prefill: {
                    name: formData.fullName,
                    email: "himmu@example.com",
                    contact: formData.mobileNumber,
                },
                notes: {
                    address: `${formData.flat}, ${formData.area}, ${formData.landmark}`,
                },
                theme: {
                    color: "#FF5722",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error during checkout:", error);
            setPaymentFailure(true);
            setTimeout(() => setPaymentFailure(false), 3000);
        }
    };


    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8 ">
            {paymentSuccess && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-md shadow-md">
                    Payment Successful! Redirecting to products...
                </div>
            )}
            {paymentFailure && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-4 rounded-md shadow-md">
                    Payment Failed. Please try again.
                </div>
            )}
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                                ₹
                                                {(item.discountedPrice || item.originalPrice || 0) *
                                                    item.cartQuantity}
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

                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                        {!showSummary ? (
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
                                                type={
                                                    field === "mobileNumber" || field === "pincode" ? "text" : "text"
                                                }
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
                                    Proceed to Payment
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-5">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Summary</h2>
                                <div>
                                    <h3 className="font-semibold text-lg">Products:</h3>
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="text-gray-700">
                                            <p>{item.title} - ₹{(item.discountedPrice || item.originalPrice || 0) * item.cartQuantity}</p>
                                        </div>
                                    ))}
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-lg">Total: ₹{calculateTotal()}</h3>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Delivery Address:</h3>
                                    <p className="text-gray-700">{`${formData.fullName}, ${formData.flat}, ${formData.area}, ${formData.landmark}, ${formData.townCity}, ${formData.state} - ${formData.pincode}`}</p>
                                    <p className="text-gray-700">{formData.mobileNumber}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handlePayment}
                                    className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
                                >
                                    Proceed with Payment
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
