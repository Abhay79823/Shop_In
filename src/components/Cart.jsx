
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import API from '../services/api';
import '../App.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCartItems(res.data); // Expecting formatted items from backend
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    try {
      await API.delete('/cart');
      fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clear cart');
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {error && <p>{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} onCartChange={fetchCart} />
          ))}
          <button onClick={handleClearCart}>Empty Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
