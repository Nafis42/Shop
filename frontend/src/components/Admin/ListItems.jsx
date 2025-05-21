import React, { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
import ProductCard from './ProductCard';
import axios from 'axios';

const ListItems = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
      try {
          const response = await axios.get('/api/products/get-products');
          if (response && response.data.success) {
              setProducts(response.data.data);
              console.log(response);
          }
      }  catch (error) {
          console.error('There was an error fetching products:', error);
      }
  };

  useEffect(() => {
          getProducts();
      }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListItems;
