import React from 'react';
import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListItem from './ProductListItem';

const ProductsList = ({ products }) => {
  return (
    <Stack sx={{ gap: 10 }}>
      {products.map(p => (
        <ProductListItem key={p.pkProduct} product={p} />
      ))}
    </Stack>
  );
};

ProductsList.propTypes = { products: PropTypes.array };

export default ProductsList;
