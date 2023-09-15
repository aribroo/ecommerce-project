import { NavLink } from 'react-router-dom';
import '../components/styles/NavigationBar.css';
import { FaShoppingCart } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
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
          <NavLink to="/transactions">Transaction</NavLink>
        </li>
      </ul>
      <div className="icons">
        <NavLink to="/cart" className="cart-icon">
          <FaShoppingCart />
          {/* eslint-disable-next-line react/prop-types */}
          <p className="cart-product-count">{totalCartItems ? totalCartItems.length : 0}</p>
        </NavLink>
        <NavLink to="/profile" className="profile-icon">
          👤
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationBar;
