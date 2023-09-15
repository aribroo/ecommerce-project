import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetail } from '../api/product-api';

const CheckoutResult = () => {
  const { transactionId } = useParams();

  const [transactionDetail, setTransactionDetail] = useState({});

  useEffect(() => {
    getTransactionDetail(transactionId).then((result) => setTransactionDetail(result));
  }, []);

  return (
    <div className="checkout-success">
      <h2>Checkout Successful</h2>
      <p>Transaction ID : {transactionDetail.transactionId}</p>
      <p>Transaction Number : {transactionDetail.trs_number}</p>
    </div>
  );
};

export default CheckoutResult;
