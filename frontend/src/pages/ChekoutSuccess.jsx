import '../components/styles/CheckoutSuccess.css';

const CheckoutSuccess = () => {
  return (
    <div className="checkout-confirmation">
      <h2>Checkout Confirmation</h2>
      <p>Thank you for your purchase!</p>
      <p>Your transaction details:</p>
      <div>Transaction ID:</div>
      <div>Transaction Number:</div>
    </div>
  );
};

export default CheckoutSuccess;
