import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import BrandDetails from './BrandDetails';
import { LINK_SOURCE_TYPE } from '../../config/constants';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const ProductSync = () => {
  const { uuid } = useParams();
  const { state, syncBrand } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.product.value?.uuid);
  const isLoading = !hasFetched.current || state.product.loading;

  useEffect(() => {
    if (uuid && uuid !== state.product.value?.uuid) {
      syncBrand({
        name: document.getElementsByClassName('collection__info--title')[0]
          ?.innerText,
        description: document.getElementsByClassName(
          'collection__info--description'
        )[0]?.innerText,
        links: [
          {
            fkLinkSourceType: LINK_SOURCE_TYPE.OCS.value,
            value: window.location.origin + window.location.pathname
          }
        ]
      });
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          <BrandDetails brand={state.brand.value} isLoading={isLoading} />
        }
        path="/"
      />
      <Route
        element={<Navigate replace to={`/brands/${uuid}/sync`} />}
        path="*"
      />
    </Routes>
  );
};

export default ProductSync;
