
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../redux/cartSlice';
import '../App.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <h3>{item.title}</h3>
      <p>${item.price}</p>
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
