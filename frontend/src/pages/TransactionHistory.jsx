import '../components/styles/TransactionHistory.css';
import { useEffect, useState } from 'react';
import { getTransactionHistories } from '../api/product-api';
import { useNavigate, Link } from 'react-router-dom';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    getTransactionHistories(token).then((result) => {
      if (result.errors === 'Unauthorize' || result.errors === 'Forbidden') navigate('/login');

      setTransactions(result.data);
    });
  }, []);

  console.log(transactions);

  const getYear = (string) => {
    const dateObject = new Date(string);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate;
  };

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.transaction_id}</td>
              <td>{getYear(transaction.date)}</td>
              <td>
                <div className="product-info">
                  {transaction.products.map((product) => (
                    <div key={product.id}>
                      <p className="product-title">{product}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <p>IDR {transaction.amount.toLocaleString('id-ID')}</p>
              </td>
              <td>
                <Link to={`/transaction/${transaction.transaction_id}`}>
                  <button className="view-detail-button">View Detail</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
