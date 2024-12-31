import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';

const ProductDetails = () => {


    const [productDetail, setProductDetail] = useState(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/products/product/${id}`);
                setProductDetail(response.data);
            } catch (err) {
                console.error('Error fetching product:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);
    // Static product data
    const product = {
        _id: '1',

        brand: 'Nike',
        category: 'Shoes',
        description: 'The Nike Air Max 270 delivers visible cushioning under every step. It features Nike\'s biggest heel Air unit yet, offering superior comfort while its modern design keeps a fresh look.',
        imageUrls: ['https://m.media-amazon.com/images/I/71gJU0Yh4JL._SX695_.jpg', 'https://m.media-amazon.com/images/I/71gJU0Yh4JL._SX695_.jpg', 'https://m.media-amazon.com/images/I/71gJU0Yh4JL._SX695_.jpg'],
        originalPrice: 12999,
        discountedPrice: 9999,
        quantity: 10,
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-boxdark rounded-xl shadow-lg">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <div className="h-96 p-4">
                        <img
                            src={product.imageUrls[0]}
                            alt={product.title}
                            className="w-full h-full object-contain bg-white dark:bg-boxdark transition-transform duration-500 ease-in-out transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="md:w-1/2 p-8">
                    <div className="mb-6">
                        <p className="text-orange-500">{product.brand}</p>
                        <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
                        <div className="text-gray-600 mt-2">
                            Category: {product.category}
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <span className="text-3xl font-bold text-orange-600">
                                ₹{product.discountedPrice}
                            </span>
                            <span className="text-xl text-gray-500 line-through ml-4">
                                ₹{product.originalPrice}
                            </span>
                        </div>
                        <div className="text-green-600">
                            {((product.originalPrice - product.discountedPrice) / product.originalPrice * 100).toFixed(0)}% OFF
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Stock Available: {product.quantity}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-2">Description:</h3>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;