
import React, { useState } from 'react';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import '../App.css';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const { products, loading, error } = useFetchProducts();

  
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list" >
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
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

