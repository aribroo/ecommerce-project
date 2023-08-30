import '../components/styles/Cart.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { getCart, removeCartItem, updateCarts } from '../api/product-api';
import { Link } from 'react-router-dom';

const Cart = ({ countCartItems }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart(12345)
      .then((result) => setCartItems(result))
      .catch((e) => console.log(e));
  }, []);

  const handleCart = (id) => {
    removeCartItem(id).then(() => {
      getCart(12345).then((result) => countCartItems(result));
    });

    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.product.price, 0);
    return totalPrice.toLocaleString('id-ID');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, qty: newQuantity } : item)));
  };

  const handleUpdateCarts = () => {
    cartItems.map((item) => {
      updateCarts(item.id, item.qty).catch((e) => 'Error' + e);
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="wrapper">
          <h1>Your Cart</h1>
          <p>Your cart is currently empty.</p>
          <Link to="/" className="back-to-home">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="wrapper">
        <h1>Your Cart</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="product-item">
                    <img src={`${api.imageUrl}${item.product.image}`} alt={item.product.title} />
                    <h4>{item.product.title}</h4>
                  </div>
                </td>
                <td className="product-price">IDR {item.product.price.toLocaleString('id-ID')}</td>
                <td>
                  <div className="quantity-control">
                    <input type="number" className="quantity-input" value={item.qty} min={1} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} />
                  </div>
                  {/* <div className="quantity-control">
                    <input type="number" className="quantity-input" value={item.qty} min={1} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} />
                  </div> */}
                </td>

                <td className="product-total-price">IDR {(item.product.price * item.qty).toLocaleString('id-ID')}</td>
                <td>
                  <button className="delete-product" onClick={() => handleCart(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="checkout-container">
          <div className="total-price">SubTotal: IDR {calculateTotalPrice()}</div>
          <div className="checkout-section">
            <Link to={'/checkout/?session_id=12345'} className="checkout-button" onClick={handleUpdateCarts}>
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  countCartItems: PropTypes.func.isRequired
};

export default Cart;
