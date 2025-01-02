import React from 'react';
import { useSelector } from 'react-redux';

const PaymentSummary = () => {
    const formData = useSelector((state) => state.checkout.formData);
    const cartItems = useSelector((state) => state.cart.items);

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                const price = item.discountedPrice || item.originalPrice || 0;
                return total + price * (item.cartQuantity || 1);
            }, 0)
            .toFixed(2);
    };

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">No data found. Please complete the checkout first.</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen px-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">Payment Summary</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        {/* Render Cart Items */}
                        {/* ... */}
                        <div className="mt-6 text-lg font-semibold text-gray-900 flex justify-between">
                            <span>Total:</span>
                            <span className="text-orange-500">₹{calculateTotal()}</span>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                        <div className="space-y-4">
                            <p><strong>Full Name:</strong> {formData.fullName}</p>
                            <p><strong>Mobile Number:</strong> {formData.mobileNumber}</p>
                            <p><strong>Pincode:</strong> {formData.pincode}</p>
                            <p><strong>Flat, House no., Building, Company, Apartment:</strong> {formData.flat}</p>
                            <p><strong>Area:</strong> {formData.area}</p>
                            <p><strong>Landmark:</strong> {formData.landmark}</p>
                            <p><strong>Town/City:</strong> {formData.townCity}</p>
                            <p><strong>State:</strong> {formData.state}</p>
                        </div>
                        <button
                            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium mt-6"
                            onClick={() => window.location.href = '/payment'}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaymentSummary;