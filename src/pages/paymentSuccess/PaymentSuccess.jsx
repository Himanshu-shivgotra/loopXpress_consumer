import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const referenceNum = searchParams.get("reference");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const handleTrackOrder = () => {
        // navigate(`/track-order?orderId=${orderId}`);
        console.log(" order tracking")
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center">
                    <img
                        src="https://img.icons8.com/?size=100&id=19Qs7U6PcAie&format=png&color=000000"
                        alt="Success Icon"
                        className="mx-auto mb-4 w-16 h-16"
                    />
                    <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful</h1>
                    <p className="text-lg text-gray-700">Thank you for your purchase!</p>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500">Reference Number: {referenceNum}</p>
                        <p className="text-sm text-gray-500">Order ID: {orderId}</p>
                    </div>
                    <div className="mt-6">
                        {orderId && (
                            <button
                                onClick={handleTrackOrder}
                                className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200"
                            >
                                Track Your Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
