import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';
import PostDetails from '../posts/PostDetails';

const ProductView = () => {
  const { uuid } = useParams();
  const { state, fetchProduct } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.product.value?.uuid);
  const isLoading = !hasFetched.current || state.product.loading;

  useEffect(() => {
    if (uuid && uuid !== state.product.value?.uuid) {
      fetchProduct(uuid);
      hasFetched.current = true;
    }
  }, [uuid]);

  return (
    <Routes>
      <Route
        element={
          <PostDetails isLoading={isLoading} postItem={state.product.value} />
        }
        path="/posts/:uuid/*"
      />
      <Route
        element={
          <ProductDetails isLoading={isLoading} product={state.product.value} />
        }
        path="/"
      />
      <Route element={<Navigate replace to={`/products/${uuid}`} />} path="*" />
    </Routes>
  );
};

export default ProductView;
