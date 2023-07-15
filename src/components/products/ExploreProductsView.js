import React from 'react';
import { Stack } from '@mantine/core';
import ProductsList from './ProductsList';

const ExploreProductsView = () => {
  return (
    <Stack sx={{ flex: 1 }}>
      <ProductsList searchOnRender />
    </Stack>
  );
};

ExploreProductsView.propTypes = {};

export default ExploreProductsView;
