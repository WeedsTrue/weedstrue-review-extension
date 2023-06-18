import React from 'react';
import { Group, Image, Rating, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return (
    <Stack
      component={Link}
      sx={{
        outline: '1px solid lightgrey',
        padding: 10,
        gap: 0,
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
          outline: '2px solid dodgerblue'
        }
      }}
      to={`/products/${product.uuid}`}
    >
      <Group noWrap>
        <Stack>
          <Image height={65} src={product.images[0]?.src} width={65} />
        </Stack>
        <Stack sx={{ gap: 0, flex: 1 }}>
          <Text sx={{ fontSize: 16 }} weight={500}>
            {product.name}
          </Text>
          <Text sx={{ fontSize: 14, color: '#3f3f3f' }} weight={500}>
            {product.brand.name}
          </Text>
          <Rating readOnly value={product.rating} />
        </Stack>
      </Group>
    </Stack>
  );
};

ProductListItem.propTypes = {
  product: PropTypes.object
};

export default ProductListItem;
