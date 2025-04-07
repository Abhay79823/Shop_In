
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api'; // Using your Axios instance
import '../App.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
    </div>
  );
};

export default ProductDetail;
