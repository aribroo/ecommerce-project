import { Link, useNavigate } from 'react-router-dom';

import GetHomeProducts from '../components/GetHomeProducts';
import '../components/styles/LandingPage.css';

import shippingIcon from '../assets/icons/shipping.svg';
import refundIcon from '../assets/icons/refund.svg';
import supportIcon from '../assets/icons/support.svg';
import { useEffect, useState } from 'react';
import { getCart } from '../api/product-api';

// eslint-disable-next-line react/prop-types
const Homepage = ({ countCartItems }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      getCart(token).then((result) => countCartItems(result.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchButton = (q) => {
    navigate(`/product/?keyword=${q}`);
  };

  return (
    <>
      <div className="wrapper">
        <div className="banner1">
          <button type="button" className="cta-button">
            <Link to={`product/westmire-a56`} className="shop-now-button">
              Shop now
            </Link>
          </button>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search for products..." onChange={(e) => setKeyword(e.target.value)} />
        <button className="search-button" onClick={() => searchButton(keyword)}>
          Search
        </button>
      </div>
      <div className="homepage-product-grid">
        <GetHomeProducts />
      </div>
      <section className="product-banner">
        <div className="product-banner-wrapper">
          <div className="product-banner-description">
            <h2>Explore the Classic Vans Collection</h2>
            <p>Step into timeless style with our range of Vans sneakers. From the iconic Sk8-Hi to the Old Skool, our collection offers comfort, durability, and unmatched style.</p>
            <button className="cta-button">
              <Link to={`product/sepatu-vans-ori`} className="shop-now-button">
                Shop Now
              </Link>
            </button>
          </div>
        </div>
      </section>
      <div className="features-section">
        <div className="feature">
          <img src={shippingIcon} alt="Free Shipping Icon" />
          <h3>FREE SHIPPING</h3>
          <div className="feature-description">
            <p>Enjoy hassle-free shopping with our free shipping service. Experience the convenience of free shipping on all orders. Shop without worry, as we offer complimentary shipping on every purchase.</p>
          </div>
        </div>
        <div className="feature">
          <img src={refundIcon} alt="100% Refund Icon" />
          <h3>100% REFUND</h3>
          <div className="feature-description">
            <p>Enjoy hassle-free shopping with our free shipping service. Experience the convenience of free shipping on all orders. Shop without worry, as we offer complimentary shipping on every purchase.</p>
          </div>
        </div>
        <div className="feature">
          <img src={supportIcon} alt="24/7 Support Icon" />
          <h3>24/7 SUPPORT</h3>
          <div className="feature-description">
            <p>Enjoy hassle-free shopping with our free shipping service. Experience the convenience of free shipping on all orders. Shop without worry, as we offer complimentary shipping on every purchase.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
