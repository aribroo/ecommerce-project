import { useEffect, useState } from 'react';
import '../components/styles/ModalBox.css';

const ModalBox = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <>
      {visible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Product Added to Cart</h2>
            <p>The product has been successfully added to your cart.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBox;
