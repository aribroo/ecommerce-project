import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../components/styles/NavigationBar.css';
import { FaShoppingCart } from 'react-icons/fa';

const NavigationBar = ({ totalCartItems }) => {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span>SHOP</span>
        <span>MANIA</span>
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/transaction">Transaction</NavLink>
        </li>
      </ul>
      <div className="icons">
        <NavLink to="/cart" className="cart-icon">
          <FaShoppingCart />
          <p className="cart-product-count">{totalCartItems ? totalCartItems.length : 0}</p>
        </NavLink>
        <NavLink to="/profile" className="profile-icon">
          👤
        </NavLink>
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  totalCartItems: PropTypes.array.isRequired
};

export default NavigationBar;
