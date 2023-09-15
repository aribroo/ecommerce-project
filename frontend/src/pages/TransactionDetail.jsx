import '../components/styles/TransactionDetail.css';
import api from '../api/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const TransactionDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [transaction, setTransaction] = useState(null);

  const getTransactionDetail = async (id, token) => {
    const response = await fetch(`http://localhost:3000/transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();
    return result;
  };

  useEffect(() => {
    if (!token) return navigate('/login');

    getTransactionDetail(id, token).then((result) => {
      if (result.errors === 'Unauthorize' || result.errors === 'Forbidden') return navigate('/login');

      setTransaction(result.data);
    });
  }, []);

  return (
    <>
      {transaction && (
        <div className="transaction-detail">
          <h1>Transaction Details</h1>
          <div className="transaction-info">
            <div className="transaction-field">
              <h3>Transaction ID:</h3>
              <p>{transaction.trs_id}</p>
            </div>
            <div className="transaction-field">
              <h3>Transaction Number:</h3>
              <p>{transaction.trs_number}</p>
            </div>
            <div className="transaction-field">
              <h3>Amount:</h3>
              <p>IDR {transaction.amount.toLocaleString('id-ID')}</p>
            </div>
          </div>
          <h2>Ordered Products</h2>
          <div className="ordered-products">
            {transaction.products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={`${api.imageUrl}${product.image}`} alt={product.title} width="100" height="100" />
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: IDR {product.price.toLocaleString('id-ID')}</p>
                  <p>Qty: {product.qty}</p>
                  <p>Total Price: IDR {(product.price * product.qty).toLocaleString('id-ID')}</p>
                  <p>Short Description: {product.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Link to={`/transactions`}>
              <button className="back-button">Back</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionDetail;
