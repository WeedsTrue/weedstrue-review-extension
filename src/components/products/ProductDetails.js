import React, { useContext, useEffect, useRef } from 'react';
import { Rating, Skeleton, Stack, Tabs, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { LINK_SOURCE_TYPE } from '../../config/constants';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';
import ReviewList from '../reviews/ReviewList';

const ProductDetails = () => {
  const { uuid } = useParams();
  const { state, fetchProduct, syncProduct } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.product.value?.uuid);
  const isLoading = !hasFetched.current || state.product.loading;

  useEffect(() => {
    if (uuid && uuid !== state.product.value?.uuid) {
      fetchProduct(uuid, () => {}, onSyncProduct);
      hasFetched.current = true;
    }
  }, [uuid]);

  const onSyncProduct = () => {
    const product = {
      name: document.getElementsByClassName('product__title')[0].innerText,
      brand: {
        name: document.getElementsByClassName('product__brand')[0].innerText,
        links: []
      },
      links: [
        {
          fkLinkSourceType: LINK_SOURCE_TYPE.OCS.value,
          value: window.location.href
        }
      ]
    };
    syncProduct(product);
  };

  return !isLoading && state.product.value ? (
    <Stack sx={{ gap: 10 }}>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Text
          component={Link}
          sx={{
            fontSize: 16,
            lineHeight: '16px',
            color: 'dodgerblue',
            '&:hover': { fontWeight: 500 }
          }}
          to={`/brands/${state.product.value.brand.uuid}`}
        >
          {state.product.value.brand.name}
        </Text>
        <Title order={3} sx={{ textAlign: 'center' }}>
          {state.product.value.name}
        </Title>
        <Rating readOnly value={4}></Rating>
      </Stack>
      <Tabs defaultValue="reviews" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt="xs" value="reviews">
          <ReviewList />
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

ProductDetails.propTypes = {};

export default ProductDetails;
