import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useCart } from '../../context/CartContext';

const CategoryProducts = ({ categoryId, categoryName }) => {
    const [products, setProducts] = useState([]);
    // const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/get-products');
                if (response.data.success) {
                    // Filter products for this specific category
                    const categoryProducts = response.data.data.filter(
                        product => product.category.some(cat => cat._id === categoryId)
                    );
                    setProducts(categoryProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    {categoryName}
                </h2>
                <Link 
                    to={`/category/${categoryId}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    See All →
                </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.slice(0, 5).map((product) => (
                    <div 
                        key={product._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <Link to={`/product/${product._id}`} className="block">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={product.photo} 
                                    alt={product.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product._id}`}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex justify-between items-center mb-3">
                                <p className="text-xl font-bold text-gray-900">
                                    ₹{product.price}
                                </p>
                                <span className="text-sm text-gray-500">
                                    {product.quantity} in stock
                                </span>
                            </div>
                            <button
                                // onClick={() => addToCart(product)}
                                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts; 