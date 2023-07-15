import { useContext, useEffect } from 'react';
import { LINK_SOURCE_TYPE } from '../../config/constants';
import { Context as ReviewsContext } from '../../providers/ReviewsProvider';

const BrandImport = () => {
  const { importBrands } = useContext(ReviewsContext);

  useEffect(() => {
    const brandElements = document
      .getElementsByTagName('table')[0]
      .getElementsByTagName('a');
    const brands = [...brandElements].map(b => ({
      name: b.innerText,
      links: [{ value: b.href, fkLinkSourceType: LINK_SOURCE_TYPE.OCS.value }]
    }));

    importBrands(brands);
  }, []);

  return null;
};

BrandImport.propTypes = {};

export default BrandImport;
