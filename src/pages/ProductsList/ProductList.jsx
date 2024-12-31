import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';
import axiosInstance from '../../common/axiosInstance';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/products/all-products'
                );

                const data = await response.data;
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    console.log("produts", products)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold py-2">Products</h1>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.map((product, index) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;