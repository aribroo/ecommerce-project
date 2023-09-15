import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ModalBox from '../components/ModalBox';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../components/styles/Product.css';
import { getAllProducts, addToCart, searchProducts, getCart } from '../api/product-api';
import api from '../api/api';
import jwt_decode from 'jwt-decode';

const Product = ({ countCartItems }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('keyword');

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (!searchQuery)
      getAllProducts()
        .then((result) => setProducts(result.data))
        .catch((e) => console.log('Error get products => ', e));
    else
      searchProducts(searchQuery)
        .then((result) => setProducts(result.data))
        .catch((e) => console.log('Error get products => ', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchButton = (query) => {
    if (query.length > 0)
      searchProducts(query)
        .then((result) => setProducts(result.data))
        .catch((e) => console.log('Error get products => ', e));
  };

  const handleCart = (productId) => {
    const token = localStorage.getItem('access_token');
    if (!token) return navigate('/login');

    const decoded = jwt_decode(token);
    const userId = decoded.userId;

    addToCart(token, userId, productId).then((result) => {
      if (result.errors === 'Unauthorize' || result.errors === 'Forbidden') return navigate('/login');

      setShowModal(showModal + 1);
      getCart(token).then((result) => {
        countCartItems(result.data);
      });
    });
  };

  return (
    <div className="search-page">
      <ModalBox show={showModal} />
      <h1>All Products</h1>
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="Search for products..." onChange={(e) => setKeyword(e.target.value)} />
        <button className="search-button" onClick={() => searchButton(keyword)}>
          Search
        </button>
      </div>

      {!products && (
        <div className="not-found-page">
          <div className="wrapper">
            <h1>Sorry, Product not found</h1>
          </div>
        </div>
      )}

      {products && (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={`${api.imageUrl}${product.image}`} alt={product.title} />
              <h3>{product.title}</h3>
              <p>IDR {product.price.toLocaleString('id-ID')}</p>
              <button onClick={() => handleCart(product.id)}>Add to Cart</button>
              <Link to={`/product/${product.url}`}>
                <button>View Detail</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  countCartItems: PropTypes.func.isRequired
};

export default Product;
