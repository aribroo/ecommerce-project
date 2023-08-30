import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductHome } from '../api/product-api';
import api from '../api/api';

const GetHomeProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductHome().then((result) => setProducts(result));
  }, []);

  return (
    <>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={`${api.imageUrl}${product.image}`} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">IDR {product.price.toLocaleString('id-ID')}</p>
          <Link to={`/product/${product.url}`} className="cta-button">
            View Details
          </Link>
        </div>
      ))}
    </>
  );
};

export default GetHomeProducts;
