import React from 'react';
import { Stack } from '@mantine/core';
import ReviewListItem from './ReviewListItem';

const ReviewList = () => {
  return (
    <Stack sx={{ gap: 10 }}>
      <ReviewListItem />
      <ReviewListItem />
      <ReviewListItem />
      <ReviewListItem />
    </Stack>
  );
};

ReviewList.propTypes = {};

export default ReviewList;
