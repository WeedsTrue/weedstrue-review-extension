import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import BrandList from '../components/brands/BrandList';
import BrandSync from '../components/brands/BrandSync';
import BrandView from '../components/brands/BrandView';

const BrandsView = () => {
  return (
    <Routes>
      <Route element={<BrandList />} path="/" />
      <Route element={<BrandSync />} path="/:uuid/sync" />
      <Route element={<BrandView />} path="/:uuid/*" />
      <Route element={<Navigate replace to="/brands" />} path="*" />
    </Routes>
  );
};

export default BrandsView;
