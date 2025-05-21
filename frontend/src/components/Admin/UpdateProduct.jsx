import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    shipping: false,
    photo: null,
  });

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/category/get-category');
      if (response && response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('There was an error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/getSingleProduct/${id}`);
        const product = res.data.data;
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category?._id || '', // Use _id here
          quantity: product.quantity,
          shipping: product.shipping,
          photo: null,
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) data.append(key, form[key]);
    });

    try {
      await axios.put(`/api/products/update-products/${id}`, data);
      alert('Product updated!');
      navigate('/admin/list-items');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/delete-products/${id}`);
      alert('Product deleted!');
      navigate('/admin/list-items');
    } catch (error) {
      console.error(error);
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price"
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Quantity"
        />
        
        {/* Category Dropdown */}
        <label className="block">
          <span className="block mb-1">Category</span>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        {/* Shipping Checkbox */}
        <label className="block">
          <input
            type="checkbox"
            name="shipping"
            checked={form.shipping}
            onChange={handleChange}
            className="mr-2"
          />
          Shipping Available
        </label>

        {/* Photo Upload */}
        <input type="file" name="photo" onChange={handleChange} />

        {/* Buttons */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
        >
          Delete Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
