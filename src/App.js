import React,{Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetails = React.lazy(() => import('./components/ProductDetails'));
const Cart = React.lazy(() => import('./components/Cart'));

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;