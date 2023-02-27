import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandDetails from '../../components/brands/BrandDetails';
import BrandList from '../../components/brands/BrandList';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<BrandList />} path="/" />
      <Route element={<BrandDetails />} path="/:uuid" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
