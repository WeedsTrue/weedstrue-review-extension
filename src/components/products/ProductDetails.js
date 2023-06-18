import React from 'react';
import {
  ActionIcon,
  Group,
  Image,
  Rating,
  Skeleton,
  Stack,
  Text,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Leaf } from 'tabler-icons-react';
import { REVIEW_WEBSITE_URL } from '../../config/constants';
import PostList from '../posts/PostList';

const ProductDetails = ({ product, isLoading }) => {
  return !isLoading && product ? (
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
          to={`/brands/${product.brand.uuid}`}
        >
          {product.brand.name}
        </Text>
        <Stack
          onClick={() =>
            window
              .open(`${REVIEW_WEBSITE_URL}/products/${product.uuid}`, '_blank')
              .focus()
          }
          sx={{ gap: 10, cursor: 'pointer', placeItems: 'center' }}
        >
          <Title order={4} sx={{ textAlign: 'center' }}>
            {product.name}
          </Title>
          <Rating readOnly value={product.rating} />
          <Stack sx={{ flex: 1 }}>
            {product.images.length > 0 && (
              <Image fit="contain" height={100} src={product.images[0].src} />
            )}
          </Stack>
          <Group>
            <Group sx={{ gap: 5, marginRight: 5 }}>
              <ActionIcon
                color={'dark'}
                disabled
                size={24}
                variant="transparent"
              >
                <Leaf />
              </ActionIcon>
              <Text size={14} weight={500}>
                {product.positiveReactionCount - product.negativeReactionCount}
              </Text>
              <ActionIcon
                color={'dark'}
                disabled
                size={24}
                variant="transparent"
              >
                <Leaf
                  style={{
                    transform: 'rotate(180deg)',
                    MozTransform: 'rotate(180deg)',
                    WebkitTransform: 'rotate(180deg)',
                    msTransform: 'rotate(180deg)'
                  }}
                />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Stack>
      <PostList fkProduct={product.pkProduct} searchOnRender />
    </Stack>
  ) : (
    <Stack>
      <Stack sx={{ flex: 1, padding: 10, alignItems: 'center', gap: 10 }}>
        <Skeleton height={16} width={'50%'} />
        <Skeleton height={26} width={'90%'} />
        <Skeleton height={18} width={100} />
      </Stack>
    </Stack>
  );
};

ProductDetails.propTypes = {
  isLoading: PropTypes.bool,
  product: PropTypes.object
};

export default ProductDetails;
