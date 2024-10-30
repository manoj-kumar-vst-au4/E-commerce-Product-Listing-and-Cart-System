import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );
  const dispatch = useDispatch();

  if (!product) return <div>Product not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-md"
        />
        <div className="md:ml-6 mt-6 md:mt-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="mt-6">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          </div>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;