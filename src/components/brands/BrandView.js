import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import BrandDetails from './BrandDetails';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';
import PostDetails from '../posts/PostDetails';

const BrandView = () => {
  const { uuid } = useParams();
  const { state, fetchBrand } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.brand.value?.uuid);
  const isLoading = !hasFetched.current || state.brand.loading;

  useEffect(() => {
    if (uuid && uuid !== state.brand.value?.uuid) {
      fetchBrand(uuid);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          <PostDetails isLoading={isLoading} postItem={state.brand.value} />
        }
        path="/posts/:uuid/*"
      />
      <Route
        element={
          <BrandDetails brand={state.brand.value} isLoading={isLoading} />
        }
        path="/"
      />
      <Route element={<Navigate replace to={`/brands/${uuid}`} />} path="*" />
    </Routes>
  );
};

export default BrandView;
