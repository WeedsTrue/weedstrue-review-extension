import React from 'react';
import { Divider, Stack } from '@mantine/core';
import {
  MemoryRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Header from '../components/navigation/Header';
import BrandsView from '../views/BrandsView';
import CommunityView from '../views/CommunityView';
import HomeView from '../views/HomeView';
import ProductsView from '../views/ProductsView';

const App = () => {
  return (
    <Router>
      <Stack
        sx={{ flex: 1, width: 360, height: 600, gap: 0, overflow: 'hidden' }}
      >
        <Header />
        <Divider />

        <Stack sx={{ padding: 10, flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route element={<BrandsView />} path="/brands/*" />
            <Route element={<ProductsView />} path="/products/*" />
            <Route element={<CommunityView />} path="/community/*" />
            <Route element={<HomeView />} path="/" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </Stack>
      </Stack>
    </Router>
  );
};

export default () => <App />;
