import React from 'react';
import {
  MemoryRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import TabContentModal from '../components/common/TabContentModal';
import BrandsView from '../views/BrandsView';
import CommunityView from '../views/CommunityView';
import HomeView from '../views/HomeView';
import ProductsView from '../views/ProductsView';

const getInitialLocation = pathname => {
  const splitUrl = (
    pathname.startsWith('/') ? pathname.substring(1) : pathname
  ).split('/');

  let initialUrl = '/';
  switch (splitUrl[0]) {
    case 'products': {
      const className = document.getElementsByClassName('product')[0];
      initialUrl = className ? `/products/${splitUrl[1]}/sync` : '/products';
      break;
    }
    default:
      break;
  }
  return initialUrl;
};

const App = () => {
  const initalLocation = getInitialLocation(window.location.pathname);
  return (
    <Router initialEntries={[initalLocation]}>
      <TabContentModal>
        <Routes>
          <Route element={<BrandsView />} path="/brands/*" />
          <Route element={<ProductsView />} path="/products/*" />
          <Route element={<CommunityView />} path="/community/*" />
          <Route element={<HomeView />} path="/" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </TabContentModal>
    </Router>
  );
};

export default App;
