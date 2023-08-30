import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ModalBox from '../components/ModalBox';
import { Link, useLocation } from 'react-router-dom';
import '../components/styles/Product.css';
import { getAllProducts, addToCart, searchProducts, getCart } from '../api/product-api';
import api from '../api/api';

const Product = ({ countCartItems }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('keyword');

  useEffect(() => {
    if (!searchQuery)
      getAllProducts()
        .then((result) => setProducts(result))
        .catch((e) => console.log('Error get products => ', e));
    else
      searchProducts(searchQuery)
        .then((result) => setProducts(result))
        .catch((e) => console.log('Error get products => ', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [showModal, setShowModal] = useState(0);

  const searchButton = (q) => {
    if (q.length > 0)
      searchProducts(q)
        .then((result) => setProducts(result))
        .catch((e) => console.log('Error get products => ', e));
  };

  const handleCart = (productId) => {
    addToCart(productId).then(() => {
      setShowModal(showModal + 1);
      getCart(12345).then((result) => countCartItems(result));
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
    </div>
  );
};

Product.propTypes = {
  countCartItems: PropTypes.func.isRequired
};

export default Product;
