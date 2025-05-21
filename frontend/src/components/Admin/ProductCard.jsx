import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/admin/update-product/${product._id}`}>
      <div className="border rounded-lg shadow-lg p-4 m-2 cursor-pointer">
        <img src={product.photo} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">Category: {product.category?.name}</p>
        <p className="text-gray-800 font-bold">${product.price}</p>
        <p className="text-gray-500">Quantity Left: {product.quantity}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
