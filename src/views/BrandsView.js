import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandList from '../components/brands/BrandList';
import BrandView from '../components/brands/BrandView';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<BrandList />} path="/" />
      <Route element={<BrandView />} path="/:uuid" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
