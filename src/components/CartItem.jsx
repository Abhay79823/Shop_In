
import React from 'react';
import API from '../services/api';
import '../App.css';

const CartItem = ({ item, onCartChange }) => {
  const handleRemoveFromCart = async () => {
    try {
      await API.delete(`/cart/${item.product._id}`);
      onCartChange(); // Notify parent to refresh cart
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await API.put(`/cart/${item.product._id}`, {
        quantity: item.quantity + 1,
      });
      onCartChange();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  const handleDecreaseQuantity = async () => {
    if (item.quantity > 1) {
      try {
        await API.put(`/cart/${item.product._id}`, {
          quantity: item.quantity - 1,
        });
        onCartChange();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to update quantity');
      }
    } else {
      handleRemoveFromCart();
    }
  };

  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} />
      <h3>{item.product.name}</h3>
      <p>₹{item.product.price}</p>
      <div className="quantity-controls">
        <button onClick={handleDecreaseQuantity}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncreaseQuantity}>+</button>
      </div>
      <button onClick={handleRemoveFromCart}>Remove</button>
    </div>
  );
};

export default CartItem;
