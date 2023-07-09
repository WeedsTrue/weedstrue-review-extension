import React from 'react';
import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductsList from './ProductsList';

const ExploreProductsView = ({ product }) => {
  return (
    <Stack sx={{ flex: 1 }}>
      <ProductsList searchOnRender showFilter />
    </Stack>
  );
};

ExploreProductsView.propTypes = {
  product: PropTypes.object
};

export default ExploreProductsView;
