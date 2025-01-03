import { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get("/api/orders");
                if (data.success) {
                    setOrders(data.orders);
                }
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Failed to fetch your orders. Please try again later.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-lg font-semibold text-gray-600 animate-pulse">
                    Loading your orders...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    My Orders
                </h1>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        No orders found.
                    </p>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.razorpay_order_id}
                                className="bg-white shadow-lg rounded-xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-lg font-semibold text-gray-700">
                                            Order ID: {" "}
                                            <span className="text-gray-900">
                                                {order.razorpay_order_id}
                                            </span>
                                        </h2>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-600"
                                                : order.status === "Out for Delivery"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : order.status === "Order Transit"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            <strong>Product:</strong> {order.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <strong>Brand:</strong> {order.brand}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            <strong>Category:</strong> {order.category}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <strong>Subcategory:</strong> {order.subcategory}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            <strong>Amount Paid:</strong> ₹{order.amount}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <strong>Payment ID:</strong> {order.razorpay_payment_id}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-600">
                                            <strong>Order Date:</strong>{" "}
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Estimated Delivery:</strong>{" "}
                                            {new Date(
                                                new Date(order.createdAt).getTime() +
                                                7 * 24 * 60 * 60 * 1000
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
