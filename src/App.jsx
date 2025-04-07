import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const NotFound = lazy(() => import('./components/NotFound'));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
