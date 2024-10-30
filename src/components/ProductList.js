import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle pagination buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover hover:opacity-90 transition-opacity duration-200"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
              <p className="text-gray-500 mt-2">{product.description.substring(0, 60)}...</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition-colors`}
        >
          Previous
        </button>
        <span className="mx-4 text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600 transition-colors`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;