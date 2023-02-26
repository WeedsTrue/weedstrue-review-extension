/* global chrome */
import React, { useContext } from 'react';
import { Button, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const BrandsView = ({ location }) => {
  const { state, importBrands } = useContext(ReviewsContext);

  const onImportBrands = () => {
    const brandElements = document
      .getElementsByTagName('table')[0]
      .getElementsByTagName('a');
    const brands = [...brandElements].map(b => ({
      name: b.innerText,
      links: [{ value: b.href, fkLinkSourceType: 1 }]
    }));

    importBrands(brands);
  };

  return (
    <Stack>
      <Button
        onClick={() => {
          onImportBrands();
        }}
      >
        Import Brands
      </Button>
    </Stack>
  );
};

BrandsView.propTypes = {
  location: PropTypes.object
};

export default BrandsView;
