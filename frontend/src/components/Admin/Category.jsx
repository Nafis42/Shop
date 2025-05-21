import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function Category() {
    const [name, setname] = useState('');
    const [categories, setCategories] = useState([]);

    // Fetch categories on component mount
    useEffect(() => {
        getCategories();
    }, []);
  
  // Function to fetch categories
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

    const handleInputChange = (event) => {
      setname(event.target.value);
    };
  
    const handleCreateCategory =async (e) => {
      // Add your logic to create a category here
      // For example, you can call an API to save the category
      e.preventDefault();
      console.log('Creating category:', name);
      try {
        const response=await axios.post('/api/category/create-category',{name});
        console.log(response);
        if (response && response.data.success) {
            // navigate("/login");
            console.log('Category created:', response.data);
          }
      } catch (error) {
        console.error('There was an error in creating category:', error);
      }

      setname(''); // Clear input after creation
    };

    const handleDeleteCategory = async (categoryId) => {
      try {
          const response = await axios.delete(`/api/category/delete-category/${categoryId}`);
          if (response && response.data.success) {
             getCategories(); // re-fetch categories after deletion
          }
      } catch (error) {
          console.error('There was an error deleting category:', error);
      }

      
    //  handleUpdateCategory
    // handleUpdateCategory


  };

  const handleUpdateCategory = async (categoryId) => {
    // Add your logic for updating the category here
    const newName = prompt('Enter new category name:');
    if (newName) {
        try {
            const response = await axios.put(`/api/category/update-category/${categoryId}`, { name: newName });
            if (response && response.data.success) {
                getCategories(); // re-fetch categories after updating
            }
        } catch (error) {
            console.error('There was an error updating category:', error);
        }
    }
 }
  
    return (
      <div>
            <h1 className="text-3xl font-bold">Create Category</h1>
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleCreateCategory}
                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                    Create
                </button>
            </div>

            <h2 className="text-2xl mt-6">Categories</h2>
            <ul>
            {categories && categories.length > 0 ? (
                <ul>
                    {categories.map((category) => (
                        <li key={category._id} className="flex justify-between items-center border-b py-2">
                            <span>{category.name}</span>
                            <div>
                                <button
                                    onClick={() => handleUpdateCategory(category._id)}
                                    className="bg-blue-500 text-white p-1 rounded mx-1"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category._id)}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories found</p>
            )}
            </ul>
        </div>
    );
}

export default Category
