import React, { useState,useEffect } from 'react';
import axios from 'axios';

const AddItem = () => {

  const initialProductData = {
    name: '',
    description: '',
    price: '',
    category: [], 
    quantity: '',
    shipping: false,
    photo: null,
};
  

    const [productData, setProductData] = useState(initialProductData);

    const [categories,setCategories]=useState([]);

    const getCategories = async () => {
      try {
          const response = await axios.get('/api/category/get-category');
          if (response && response.data.success) {
              setCategories(response.data.data);
              console.log(response);
          }
      }  catch (error) {
          console.error('There was an error fetching categories:', error);
      }
    };

    useEffect(() => {
      getCategories();
    }, []);




    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            // Convert the selected options to an array of values
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setProductData({ ...productData, [name]: selectedOptions });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setProductData({ ...productData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });

        try {
            const response = await axios.post('/api/products/create-products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            if (response && response.data.success) {
              // navigate("/login");
              console.log('Product created:', response.data);
            }
            
        } catch (error) {
            console.error('Error creating product:', error);
            
            // Handle error (e.g. show error message)
        }
        setProductData(initialProductData);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required
                        className="block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:border file:border-gray-300
                                   file:rounded-md file:text-sm
                                   file:bg-gray-50 file:text-gray-700
                                   hover:file:bg-gray-100"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Product Name" 
                        value={productData.name}
                        onChange={handleChange} 
                        required 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <textarea 
                        name="description" 
                        placeholder="Product Description" 
                        value={productData.description}
                        onChange={handleChange} 
                        required 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <select 
                        name="category" 
                        value={productData.category} 
                        onChange={handleChange}
                        required
                        multiple
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {categories?.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Windows) or Command (Mac) to select multiple categories</p>
                </div>
                <div>
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Product Price" 
                        value={productData.price}
                        onChange={handleChange} 
                        required 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <input 
                        type="number" 
                        name="quantity" 
                        placeholder="Quantity" 
                        value={productData.quantity}
                        onChange={handleChange} 
                        required 
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div className="flex items-center">
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            name="shipping" 
                            checked={productData.shipping}
                            onChange={() => setProductData({ ...productData, shipping: !productData.shipping })} 
                            className="mr-2"
                        />
                        Shipping
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddItem;