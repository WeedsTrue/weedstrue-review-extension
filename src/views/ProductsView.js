import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductSync from '../components/products/ProductSync';
import ProductView from '../components/products/ProductView';

const ProductsView = () => {
  return (
    <Routes>
      <Route element={<></>} path="/" />
      <Route element={<ProductSync />} path="/:uuid/sync" />
      <Route element={<ProductView />} path="/:uuid/*" />
      <Route element={<Navigate replace to="/products" />} path="*" />
    </Routes>
  );
};

export default ProductsView;
