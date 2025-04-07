
import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import API from '../services/api';
import '../App.css';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) // assuming the field is "name"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <input 
        className="product-search"
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <h3>List of Products</h3>
      <div className="product-list-item">
        {filteredProducts.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
