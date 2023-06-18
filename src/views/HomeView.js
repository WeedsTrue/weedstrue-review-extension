import React from 'react';
import { Card, Divider, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Article, ShoppingCart } from 'tabler-icons-react';

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ flex: 1, gap: 0 }}>
      <Card
        onClick={() => navigate('/community')}
        radius="xl"
        shadow="xl"
        sx={{
          display: 'flex',
          flex: 1,
          outline: 'solid 1px lightgrey',
          cursor: 'pointer',
          '&:hover': {
            outline: 'solid 2px dodgerblue'
          },
          margin: 40
        }}
      >
        <Stack
          sx={{
            flex: 1,
            justifyContent: 'center',
            placeItems: 'center',
            textAlign: 'center',
            gap: 5
          }}
        >
          <Article size={50} />
          <Text size={24} weight={500}>
            Community
          </Text>
        </Stack>
      </Card>
      <Divider color="lightgrey" sx={{ margin: '0px 40px' }} />
      <Card
        onClick={() => navigate('/products')}
        radius="xl"
        shadow="xl"
        sx={{
          display: 'flex',
          flex: 1,
          outline: 'solid 1px lightgrey',
          cursor: 'pointer',
          '&:hover': {
            outline: 'solid 2px dodgerblue'
          },
          margin: 40
        }}
      >
        <Stack
          sx={{
            flex: 1,
            justifyContent: 'center',
            placeItems: 'center',
            textAlign: 'center',
            gap: 5
          }}
        >
          <ShoppingCart size={50} />
          <Text size={24} weight={500}>
            Explore Products
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
};

export default HomeView;
