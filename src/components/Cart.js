import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 mt-1">${item.price}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold text-gray-800">Total:</h2>
            <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;