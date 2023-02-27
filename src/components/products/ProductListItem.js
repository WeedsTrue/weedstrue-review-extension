import React from 'react';
import { Rating, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return (
    <Stack
      component={Link}
      sx={{
        border: 'solid 1px lightgrey',
        padding: 10,
        gap: 0,
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#000'
      }}
      to={`/products/${product.uuid}`}
    >
      <Text sx={{ fontSize: 16 }} weight={500}>
        {product.name}
      </Text>
      <Text sx={{ fontSize: 14, color: '#3f3f3f' }} weight={500}>
        {product.brand.name}
      </Text>
      <Rating readOnly value={4} />
      <Text
        sx={{
          fontSize: 14,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          display: '-webkit-box'
        }}
      >
        {product.description}
      </Text>
    </Stack>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.object
};

export default ProductListItem;
