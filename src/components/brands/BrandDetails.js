import React from 'react';
import { Rating, Skeleton, Stack, Tabs, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';
import ProductsList from '../products/ProductsList';

const BrandDetails = ({ brand, isLoading }) => {
  return !isLoading && brand ? (
    <Stack sx={{ gap: 10 }}>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Title order={4} sx={{ textAlign: 'center' }}>
          {brand.name}
        </Title>
        <Rating readOnly value={brand.rating}></Rating>
      </Stack>
      <Tabs defaultValue="reviews" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="products">Products</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt="xs" value="reviews">
          <PostList fkBrand={brand.pkBrand} searchOnRender />
        </Tabs.Panel>
        <Tabs.Panel pt="xs" value="products">
          <ProductsList fkBrand={brand.pkBrand} searchOnRender />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  ) : (
    <Stack>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Skeleton height={26} width={'90%'} />
        <Skeleton height={18} width={100} />
      </Stack>
    </Stack>
  );
};

BrandDetails.propTypes = {
  brand: PropTypes.object,
  isLoading: PropTypes.bool
};

export default BrandDetails;
