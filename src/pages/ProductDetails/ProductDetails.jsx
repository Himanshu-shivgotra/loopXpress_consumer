import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/axiosInstance';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/slices/cart/cartSlice';

const ProductDetails = (product) => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/products/product/${id}`);
                setProductDetail(response.data);
            } catch (err) {
                console.error('Error fetching product:', err.response?.data || err.message);
            }
        };
        fetchProduct();
    }, [id]);


    if (!productDetail) {
        return <div>Loading...</div>;
    }

    const images = productDetail.imageUrls || [];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        dispatch(addItem({ ...product }));
        console.log(product)
    };

    return (

        < div className="container items-center px-4 py-8" >
            <div className=" mx-auto flex flex-col md:flex-row justify-center bg-white dark:bg-boxdark rounded-xl shadow-lg">
                {/* Image Section */}
                <div className="md:w-1/3 ">
                    <div className="h-96 p-4">
                        <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-gray-100 dark:border-boxdark-2 h-full">
                            <img
                                src={images[currentImageIndex]}
                                alt={productDetail.title}
                                className="w-full h-full object-contain bg-white dark:bg-boxdark transition-transform duration-500 ease-in-out transform hover:scale-105"
                            />

                            {/* Image Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={previousImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dc651d]"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>

                                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Image Thumbnails */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-3 mt-6">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectImage(index)}
                                    className={`cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${currentImageIndex === index
                                        ? 'border-2 border-[#dc651d] shadow-lg scale-105'
                                        : 'border-2 border-transparent hover:border-gray-300 dark:hover:border-boxdark-2'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-24 object-cover hover:opacity-90 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details Section */}
                <div className="md:w-1/2 p-8">
                    <div className="mb-6">
                        <p className="text-orange-500">{productDetail.brand}</p>
                        <h1 className="text-2xl font-bold mt-2">{productDetail.title}</h1>
                        <div className="text-gray-600 mt-2">
                            Category: {productDetail.category}
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <span className="text-3xl font-bold text-orange-600">
                                ₹{productDetail.discountedPrice}
                            </span>
                            <span className="text-xl text-gray-500 line-through ml-4">
                                ₹{productDetail.originalPrice}
                            </span>
                        </div>
                        <div className="text-green-600">
                            {((productDetail.originalPrice - productDetail.discountedPrice) / productDetail.originalPrice * 100).toFixed(0)}% OFF
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Stock Available: {productDetail.quantity}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-semibold mb-2">Description:</h3>
                        <p className="text-gray-600">{productDetail.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div onClick={handleAddToCart} className="flex gap-4">
                        <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductDetails;
