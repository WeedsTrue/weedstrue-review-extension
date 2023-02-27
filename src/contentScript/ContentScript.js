import React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import BrandsView from './views/BrandsView';
import ProductsView from './views/ProductsView';
import TabContentModal from '../components/common/TabContentModal';

const getInitialLocation = pathname => {
  const splitUrl = pathname.split('/');

  let initialUrl = '/';
  switch (splitUrl[1]) {
    case 'shop-by-brands':
      initialUrl = '/brands';
      break;
    case 'collections':
      initialUrl = splitUrl.length > 2 ? `/brands/${splitUrl[2]}` : '/brands';
      break;
    case 'products':
      initialUrl =
        splitUrl.length > 2 ? `/products/${splitUrl[2]}` : '/products';
      break;
    default:
      break;
  }
  return initialUrl;
};

const ContentScript = () => {
  const initalLocation = getInitialLocation(window.location.pathname);
  return initalLocation === '/' ? null : (
    <Router initialEntries={[initalLocation]}>
      <TabContentModal>
        <Routes>
          <Route element={<BrandsView />} path="/brands/*" />
          <Route element={<ProductsView />} path="/products/*" />
        </Routes>
      </TabContentModal>
    </Router>
  );
};

export default ContentScript;
