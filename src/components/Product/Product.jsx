import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/productDetails`);
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        console.log(`Added ${product.title} to cart`);
    };

    return (
        <div
            className="max-w-sm p-4 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Product Card */}
            <div className="border border-gray-300 rounded-lg shadow-md p-4 flex flex-col bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300 relative">
                {/* Discount Badge */}
                {product.discount && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold py-1 px-2 rounded-lg">
                        {product.discount}% OFF
                    </span>
                )}
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-md">
                    <img
                        src={product?.imageUrls[0]}
                        alt={product?.title || "Product"}
                        className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-110"
                    />
                </div>
                {/* Product Details */}
                <div className="mt-4">
                    {/* Product Title */}
                    <h2 className="text-lg font-semibold mb-1 text-gray-800 truncate">
                        {product?.title}
                    </h2>
                    {/* Brand Name */}
                    <p className="text-sm text-gray-600 mb-2">{product?.brand}</p>
                    {/* Ratings */}
                    <div className="flex items-center text-yellow-500 mb-2">
                        <span className="text-sm font-semibold">⭐ {product.rating || '4.5'}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.reviews || 120} reviews)</span>
                    </div>
                    {/* Price Section */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                        <span className="text-orange-500 font-bold text-lg">₹{product.discountedPrice}</span>
                    </div>
                    {/* Category */}
                    <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                    {/* CTA Button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
