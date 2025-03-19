import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🎉 Your order was successful!</h2>
      <p>Thank you for shopping with us.</p>
      <button onClick={() => navigate("/books")}>Continue Shopping</button>
    </div>
  );
};

export default CheckoutSuccess;
