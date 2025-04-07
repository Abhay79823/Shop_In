import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import API from '../services/api';
import '../App.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      const response = await API.post('/cart', {
        productId: product._id,
        quantity: 1,
      });

      // Update Redux cart with response from backend
      dispatch(addToCart(response.data)); // Assuming response has the cart item data

      alert('Added to cart!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductItem;



