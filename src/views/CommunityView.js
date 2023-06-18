import React from 'react';
import { Stack } from '@mantine/core';
import PostList from '../components/posts/PostList';

const CommunityView = () => {
  return (
    <Stack sx={{ flex: 1 }}>
      <PostList searchOnRender />
    </Stack>
  );
};

export default CommunityView;
