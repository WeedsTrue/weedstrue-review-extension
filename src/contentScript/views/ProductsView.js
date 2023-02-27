import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductDetails from '../../components/products/ProductDetails';
import ProductsList from '../../components/products/ProductsList';

const ProductsView = () => {
  return (
    <Routes>
      <Route element={<ProductsList />} path="/" />
      <Route element={<ProductDetails />} path="/:uuid" />
      <Route element={<Navigate replace to="/products" />} path="*" />
    </Routes>
  );
};

export default ProductsView;
