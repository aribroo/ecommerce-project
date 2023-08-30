import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalBox from '../components/ModalBox';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, addToCart, getCart } from '../api/product-api';
import api from '../api/api';

import '../components/styles/ProductDetail.css';

const DetailProduct = ({ countCartItems }) => {
  const { url } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetail(url)
      .then((result) => {
        setProduct(result);
        setProduct({ ...result, category: result.category.name });
      })
      .catch((e) => {
        console.log('Error fetch data =>', e);
        navigate('*');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(product.price);

  const handleCart = (productId) => {
    setShowModal(showModal + 1);

    addToCart(productId).then(() => {
      getCart(12345).then((result) => countCartItems(result));
    });
  };

  return (
    <>
      <ModalBox show={showModal} />
      <div className="product-detail">
        <div className="wrapper">
          <div className="product-image">
            <img src={`${api.imageUrl}${product.image}`} alt="Nama Produk" />
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">IDR {formattedPrice}</p>
            <p className="product-category">Category : {product.category}</p>
            <p className="product-description-short">{product.desc}</p>
            <p className="product-quantity">Stock: {product.stock}</p>

            <div className="quantity-control">
              <button onClick={decreaseQuantity} className="quantity-button">
                -
              </button>
              <input value={quantity} min="1" onChange={handleQuantityChange} className="quantity-input" />
              <button onClick={increaseQuantity} className="quantity-button">
                +
              </button>
            </div>
            <button className="add-to-cart-button" onClick={() => handleCart(product.id)}>
              Add to Cart
            </button>
          </div>
        </div>
        <div className="full-description">
          <h2>Full Description</h2>
          <p>{product.full_desc}</p>
        </div>
      </div>
    </>
  );
};

DetailProduct.propTypes = {
  countCartItems: PropTypes.func.isRequired
};

export default DetailProduct;
