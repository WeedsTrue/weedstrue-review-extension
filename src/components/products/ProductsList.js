import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Divider, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import ProductListFilter from './ProductListFilter';
import ProductListItem from './ProductListItem';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const ProductsList = ({ fkBrand, searchOnRender }) => {
  const hasFetched = useRef(false);
  const { state, fetchProducts } = useContext(ReviewsContext);
  const [filterState, setFilterState] = useState({
    sortBy: 'trending',
    fkProductType: null,
    skip: null,
    totalCount: 0,
    isLoading: false,
    showMoreLoading: false
  });

  useEffect(() => {
    if (searchOnRender) {
      setFilterState({
        ...filterState,
        isLoading: true
      });
      fetchProducts({ ...filterState, fkBrand }, totalCount =>
        setFilterState({
          ...filterState,
          totalCount,
          isLoading: false,
          skip: null,
          showMoreLoading: false
        })
      );
      hasFetched.current = true;
    }
  }, [searchOnRender]);

  const onFilterChange = (name, value) => {
    const newState = {
      ...filterState,
      [name]: value,
      isLoading: true
    };
    newState.showMoreLoading = !!newState.skip;
    setFilterState(newState);
    fetchProducts({ ...newState, fkBrand }, totalCount =>
      setFilterState({
        ...newState,
        totalCount,
        isLoading: false,
        skip: null,
        showMoreLoading: false
      })
    );
  };

  return (
    <Stack sx={{ gap: 10 }}>
      <ProductListFilter
        filterState={filterState}
        isLoading={filterState.isLoading}
        onFilterChange={onFilterChange}
      />
      <Divider />
      {(searchOnRender && !hasFetched.current) || state.products.loading ? (
        <>
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
          <ProductListItem />
        </>
      ) : state.products.value.length === 0 ? (
        <Card>
          <Stack
            sx={{
              padding: 20,
              textAlign: 'center'
            }}
          >
            <Text size={14} weight={500}>
              No products available
            </Text>
          </Stack>
        </Card>
      ) : (
        state.products.value.map(p => (
          <ProductListItem key={p.pkProduct} product={p} />
        ))
      )}
      {!state.products.loading &&
        filterState.totalCount > state.products.value.length && (
          <Button
            color="dark"
            loading={filterState.showMoreLoading}
            onClick={() => onFilterChange('skip', state.products.value.length)}
            sx={{ margin: '10px auto' }}
            variant="outline"
          >
            Show More
          </Button>
        )}
    </Stack>
  );
};

ProductsList.propTypes = {
  fkBrand: PropTypes.number,
  searchOnRender: PropTypes.bool
};

export default ProductsList;
