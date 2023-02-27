import React, { useContext, useEffect, useRef } from 'react';
import { Rating, Skeleton, Stack, Tabs, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';
import ProductsList from '../products/ProductsList';
import ReviewList from '../reviews/ReviewList';

const BrandDetails = () => {
  const { uuid } = useParams();
  const { state, fetchBrand } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.brand.value?.uuid);
  const isLoading = !hasFetched.current || state.brand.loading;

  useEffect(() => {
    if (uuid && uuid !== state.brand.value?.uuid) {
      fetchBrand(uuid);
      hasFetched.current = true;
    }
  }, [uuid]);

  return !isLoading && state.brand.value ? (
    <Stack sx={{ gap: 10 }}>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Title order={3} sx={{ textAlign: 'center' }}>
          {state.brand.value.name}
        </Title>
        <Rating readOnly value={4}></Rating>
      </Stack>
      <Tabs defaultValue="reviews" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
          <Tabs.Tab value="products">Products</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt="xs" value="reviews">
          <ReviewList />
        </Tabs.Panel>
        <Tabs.Panel pt="xs" value="products">
          <ProductsList products={state.brand.value.products} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  ) : (
    <Stack>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Skeleton height={16} width={'50%'} />
        <Skeleton height={44} width={'90%'} />
        <Skeleton height={18} width={100} />
      </Stack>
    </Stack>
  );
};

export default BrandDetails;
