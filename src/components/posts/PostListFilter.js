import React from 'react';
import { Select, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChartArrowsVertical, Flame, Star, Sun } from 'tabler-icons-react';
import { mq } from '../../config/theme';

const FILTER_BUTTONS = [
  {
    label: 'Trending',
    action: 'trending',
    icon: <Flame />,
    value: 'trending'
  },
  {
    label: 'New',
    action: 'new',
    icon: <Sun />,
    value: 'new'
  },
  {
    label: 'Top',
    action: 'top',
    icon: <ChartArrowsVertical />,
    value: 'top'
  },
  {
    label: 'Rating',
    action: 'rating',
    icon: <Star />,
    value: 'rating'
  }
];

const POST_TYPES = [
  {
    value: 1,
    label: 'Reviews'
  },
  {
    value: 2,
    label: 'News'
  },
  {
    value: 3,
    label: 'Questions'
  },
  {
    value: 4,
    label: 'Discussion'
  },
  {
    value: 5,
    label: 'Images'
  }
];

const PostListFilter = ({ onFilterChange, filterState }) => {
  return (
    <Stack sx={mq({ gap: 10, padding: 0 })}>
      <Select
        data={FILTER_BUTTONS.map(b => ({
          label: b.label,
          value: b.value
        }))}
        onChange={value => onFilterChange('sortBy', value)}
        value={filterState?.sortBy}
      />
      <Select
        clearable
        data={POST_TYPES}
        onChange={value => onFilterChange('fkUserPostType', value)}
        placeholder="Filter by post..."
        value={filterState?.fkUserPostType}
      />
    </Stack>
  );
};

PostListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default PostListFilter;
