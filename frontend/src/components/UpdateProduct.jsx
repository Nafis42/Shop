import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: '',
        shipping: false,
        photo: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch product details and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch product details
                const productRes = await axios.get(`/api/getSingleProduct/${id}`);
                const productData = productRes.data.data;
                
                // Fetch categories
                const categoryRes = await axios.get('/api/get-category');
                const categoryData = categoryRes.data.data;

                setProduct({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category: productData.category._id, // Set initial category ID
                    quantity: productData.quantity,
                    shipping: productData.shipping,
                    photo: null
                });
                setCategories(categoryData);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhotoChange = (e) => {
        setProduct(prev => ({
            ...prev,
            photo: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('quantity', product.quantity);
            formData.append('shipping', product.shipping);
            if (product.photo) {
                formData.append('photo', product.photo);
            }

            const response = await axios.put(`/api/update-products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                navigate('/admin/products'); // Redirect to products list
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating product');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Category:</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1">Photo:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handlePhotoChange}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="shipping"
                        checked={product.shipping}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>Enable Shipping</label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct; 