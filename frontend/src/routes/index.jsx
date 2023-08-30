import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCart } from '../api/product-api';
import { useEffect, useState } from 'react';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

import Homepage from '../pages/homepage';
import About from '../pages/About';
import Product from '../pages/Product';
import ProductDetail from '../pages/ProductDetail';
import Contact from '../pages/Contact';
import Transaction from '../pages/Transaction';
import Checkout from '../pages/Checkout';
import Cart from '../pages/cart';
import CheckoutSuccess from '../pages/ChekoutSuccess';
import NotFound from '../pages/NotFound';

const App = () => {
  const [countCartItems, setCountCartItems] = useState([]);

  useEffect(() => {
    getCart(12345).then((result) => setCountCartItems(result));
  }, []);

  const handleCountCartItems = (cartItems) => {
    setCountCartItems(cartItems);
  };

  return (
    <Router>
      <NavigationBar totalCartItems={countCartItems} />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/product" element={<Product countCartItems={handleCountCartItems} />} />
        <Route path="/product/:url" element={<ProductDetail countCartItems={handleCountCartItems} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart countCartItems={handleCountCartItems} />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
