import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCart } from '../api/product-api';
import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Homepage from '../pages/Homepage';
import About from '../pages/About';
import Product from '../pages/Product';
import ProductDetail from '../pages/ProductDetail';
import Contact from '../pages/Contact';
import TransactionHistory from '../pages/TransactionHistory';
import TransactionDetail from '../pages/TransactionDetail';
import Checkout from '../pages/Checkout';
import Cart from '../pages/Cart';
import CheckoutResult from '../pages/CheckoutResult';
import NotFound from '../pages/NotFound';

const App = () => {
  const [countCartItems, setCountCartItems] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setToken(token);
    getCart(token).then((result) => setCountCartItems(result.data));
  }, [token]);

  const handleCountCartItems = (cartItems) => {
    setCountCartItems(cartItems);
  };

  return (
    <Router>
      <NavigationBar totalCartItems={countCartItems} />
      <Routes>
        <Route exact path="/" element={<Homepage countCartItems={handleCountCartItems} />} />
        <Route path="/product" element={<Product countCartItems={handleCountCartItems} />} />
        <Route path="/product/:url" element={<ProductDetail countCartItems={handleCountCartItems} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile countCartItems={handleCountCartItems} />} />
        <Route path="/cart" element={<Cart countCartItems={handleCountCartItems} />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
        <Route path="/checkout" element={<Checkout countCartItems={handleCountCartItems} />} />
        <Route path="/checkout/:transactionId" element={<CheckoutResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
