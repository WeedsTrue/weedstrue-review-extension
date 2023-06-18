import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { LINK_SOURCE_TYPE } from '../../config/constants';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const ProductSync = () => {
  const { uuid } = useParams();
  const { state, syncProduct } = useContext(ReviewsContext);
  const hasFetched = useRef(uuid === state.product.value?.uuid);
  const isLoading = !hasFetched.current || state.product.loading;

  useEffect(() => {
    if (uuid && uuid !== state.product.value?.uuid) {
      onSyncProduct();
      hasFetched.current = true;
    }
  }, [uuid]);

  const onSyncProduct = () => {
    const productAttributes = [
      ...document
        .getElementById('product__properties-table')
        .getElementsByTagName('tr')
    ].map(r => {
      const columns = r.getElementsByTagName('td');
      return {
        attributeType: columns[0].innerText.replace(/(\r\n|\n|\r)/gm, ''),
        value: columns[1].innerText.replace(/\r?\n|\r/, '')
      };
    });
    const productImageDom = document
      .getElementsByClassName('product-images')[0]
      .querySelector('[data-slick-index="0"]')
      .getElementsByTagName('img')[0];

    const product = {
      name: document.getElementsByClassName('product__title')[0].innerText,
      brand: {
        name: document.getElementsByClassName('product__brand')[0].innerText,
        links: []
      },
      productType: document.getElementsByClassName('breadcrumbs__collection')[0]
        .innerText,
      productAttributes,
      links: [
        {
          fkLinkSourceType: LINK_SOURCE_TYPE.OCS.value,
          value: window.location.href
        }
      ],
      images: [
        {
          src: productImageDom.src,
          origin: 'OCS'
        }
      ]
    };
    syncProduct(product);
  };

  return (
    <Routes>
      <Route
        element={
          <ProductDetails isLoading={isLoading} product={state.product.value} />
        }
        path="/"
      />
      <Route
        element={<Navigate replace to={`/products/${uuid}/sync`} />}
        path="*"
      />
    </Routes>
  );
};

export default ProductSync;
