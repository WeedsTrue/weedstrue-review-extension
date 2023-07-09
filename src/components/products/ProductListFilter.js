import React, { useContext, useEffect } from 'react';
import { Loader, Select, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { ChartArrowsVertical, Flame, Star, Sun } from 'tabler-icons-react';
import { mq } from '../../config/theme';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

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

const ProductListFilter = ({ onFilterChange, filterState }) => {
  const { state, fetchProductFilters } = useContext(ReviewsContext);

  const productTypeOptions =
    state.productFilters.value?.productTypes
      ?.map(p => ({
        label: p.value,
        value: p.pkProductType.toString()
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  useEffect(() => {
    fetchProductFilters();
  }, []);

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
        data={productTypeOptions}
        disabled={state.productFilters.loading}
        icon={
          state.productFilters.loading ? (
            <Loader color="dark" size={18} />
          ) : null
        }
        onChange={value => onFilterChange('fkProductType', value)}
        placeholder="Filter by type..."
        value={filterState?.fkProductType}
      />
    </Stack>
  );
};

ProductListFilter.propTypes = {
  filterState: PropTypes.object,
  onFilterChange: PropTypes.func
};

export default ProductListFilter;
