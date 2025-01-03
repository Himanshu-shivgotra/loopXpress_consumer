import { useState, useEffect } from "react";
import axiosInstance from "../../common/axiosInstance";

const orderStatuses = [
    "Order Placed",
    "Order Transit",
    "Out for Delivery",
    "Delivered",
];

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosInstance.get("/api/orders");
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { data } = await axiosInstance.put(
                `/api/orders/update/${orderId}`,
                { status: newStatus }
            );
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.razorpay_order_id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
            setError("");
        } catch (error) {
            console.error("Error updating status:", error);
            setError("Failed to update order status");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
                    Order Tracking
                </h1>

                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.razorpay_order_id}
                            className="bg-white shadow-lg rounded-lg p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-700">
                                Order ID:{" "}
                                <span className="text-gray-900">
                                    {order.razorpay_order_id}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-500">
                                Payment ID: {order.razorpay_payment_id}
                            </p>
                            <p className="text-sm text-gray-500">
                                Amount: ₹{order.amount}
                            </p>
                            <p className="text-sm text-gray-500">
                                Category: {order.category} -{" "}
                                {order.subcategory}
                            </p>

                            <div className="mt-4">
                                <label
                                    htmlFor={`status-${order.razorpay_order_id}`}
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Status:
                                </label>
                                <select
                                    id={`status-${order.razorpay_order_id}`}
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order.razorpay_order_id,
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-2 border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {orderStatuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <span
                                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {order.status}
                                </span>
                                <button
                                    onClick={() =>
                                        handleStatusChange(
                                            order.razorpay_order_id,
                                            "Delivered"
                                        )
                                    }
                                    disabled={order.status === "Delivered"}
                                    className={`px-4 py-2 text-white rounded-md ${order.status === "Delivered"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                                >
                                    Mark as Delivered
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
