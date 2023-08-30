import { useState } from 'react';
import '../components/styles/Checkout.css';
import { orderNow } from '../api/product-api';

import creditCart from '../assets/icons/credit-card.svg';
import paypal from '../assets/icons/paypal.svg';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const [transaction, setTransactions] = useState({});

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataCustomer = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      number_phone: phoneNumber,
      address: address
    };

    checkout(dataCustomer).then((result) => {
      setTransactions(result);
    });
  };

  return (
    <div className="checkout-page">
      <div className="wrapper">
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
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
  );
};

export default Checkout;
