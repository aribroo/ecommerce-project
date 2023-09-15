import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../components/styles/Cart.css';
import '../components/styles/Register.css';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Checkout.css';
import { getCart, checkout } from '../api/product-api';

import creditCart from '../assets/icons/credit-card.svg';
import paypal from '../assets/icons/paypal.svg';

const Checkout = ({ countCartItems }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  const getProfile = async () => {
    const response = await fetch('http://localhost:3000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();
    return result;
  };

  useEffect(() => {
    getCart(token).then((result) => {
      console.log(result);
      if (result.errors === 'Unauthorize' || result.errors === 'Forbidden') return navigate('/login');
      if (result.errors === 'Cart not found') return navigate('/cart');
    });

    getProfile().then((result) => {
      if (result.errors === 'Unauthorize' || result.errors === 'Forbidden') return navigate('/login');

      setEmail(result.data.email);
      setAddress(result.data.address);
      setPhoneNumber(result.data.phone_number);
    });
  }, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const [transaction, setTransaction] = useState(null);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    checkout(token).then((result) => {
      if (result.data) {
        setTransaction(result.data);
        setTimeout(() => {
          navigate('/cart');
        }, 1500);
      }
    });
  };

  return (
    <>
      {transaction && (
        <div className="modal">
          <div className="modal-content">
            <h2>Transaction Successfully</h2>
            <p>Redirecting...</p>
          </div>
        </div>
      )}

      <div className="checkout-page">
        <div className="wrapper">
          <h1>Checkout</h1>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="personal-info">
              <div>
                <h2>Personal Information</h2>
                <div className="form-group">
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
                <textarea placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>
            <div className="payment-method">
              <h2>Payment Method</h2>
              <div className="radio-group">
                <label className="payment-option">
                  <img src={creditCart} alt="" className="payment-icon" />
                  <p>Credit Card</p>
                  <input type="radio" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
                </label>
                <label className="payment-option">
                  <img src={paypal} alt="" className="payment-icon" />
                  <p>PayPal</p>
                  <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={handlePaymentChange} />
                </label>
              </div>
            </div>
            <button className="checkout-button">Order Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

Checkout.propTypes = {
  countCartItems: PropTypes.func.isRequired
};

export default Checkout;
