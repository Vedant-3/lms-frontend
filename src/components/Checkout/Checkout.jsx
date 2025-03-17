import React, { useContext } from "react";
import "./Checkout.css";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalItems = cart.reduce((sum, book) => sum + book.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, book) => sum + book.quantity * book.price,
    0
  );

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((book) => (
          <div key={book.id} className="cart-item">
            <img src={book.imageUrl} alt={book.title} className="cart-image" />
            <div className="cart-info">
              <h3 className="cart-title">{book.title}</h3>
              <p className="cart-author">{book.author}</p>
              <p className="cart-price">${book.price.toFixed(2)}</p>
              
              {/* Quantity Selector */}
              <div className="quantity-selector">
                <button
                  onClick={() => updateQuantity(book.id, book.quantity - 1)}
                  disabled={book.quantity <= 1}
                >
                  -
                </button>
                <span>{book.quantity}</span>
                <button
                  onClick={() => updateQuantity(book.id, book.quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(book.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="checkout-summary">
        <p>Total Items: <strong>{totalItems}</strong></p>
        <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
