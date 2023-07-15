import createProvider from './createProvider';
import weedstrueAPI from '../api/weedstrueAPI';

const initialState = {
  brands: { value: [], loading: false, error: null },
  brand: { value: null, loading: false, error: null },
  comments: { value: [], loading: false, error: null },
  product: { value: null, loading: false, error: null },
  products: { value: [], loading: false, error: null },
  productFilters: { value: null, loading: false, error: null },
  userPosts: { value: [], loading: false, error: null },
  userPost: { value: null, loading: false, error: null }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: true,
          error: null
        }
      };
    case 'SUCCESS':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          ...action.payload,
          loading: false
        }
      };
    case 'ERROR':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: false,
          error: action.payload
        }
      };
    case 'REPLACE':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: [
            ...state[action.stateName].value.filter(action.payload.filter),
            ...(Array.isArray(action.payload.value)
              ? action.payload.value
              : [action.payload.value])
          ],
          loading: false
        }
      };
    case 'FIND-REPLACE': {
      const foundIndex = state[action.stateName].value.findIndex(
        action.payload.find
      );
      if (foundIndex !== -1) {
        state[action.stateName].value[foundIndex] = action.payload.value;
      }

      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: [...state[action.stateName].value],
          loading: false
        }
      };
    }
    case 'APPEND':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: Array.isArray(action.payload)
            ? [...state[action.stateName].value, ...action.payload]
            : [...state[action.stateName].value, action.payload],
          loading: false
        }
      };
    case 'REMOVE':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: state[action.stateName].value.filter(action.payload.filter),
          loading: false
        }
      };
    case 'RESET':
      return {
        ...state,
        [action.stateName]: initialState[action.stateName]
      };
    default:
      return state;
  }
};

const getErrorMessage = error => {
  if (error.response?.status === 409) {
    return error.response?.data?.error ?? 'Oops something went wrong.';
  }
  return 'Oops something went wrong.';
};

const syncBrand =
  dispatch =>
  async ({ name, description, links }, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'brand'
      });

      const response = await weedstrueAPI.post('/api/brands/sync', {
        name,
        description,
        links
      });

      dispatch({
        type: 'SUCCESS',
        stateName: 'brand',
        payload: { value: response.data }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback(e);
      }
      dispatch({
        type: 'ERROR',
        stateName: 'brand',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchBrands = dispatch => async () => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'brands'
    });
    const response = await weedstrueAPI.get('/api/brands');

    dispatch({
      type: 'SUCCESS',
      stateName: 'brands',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brands',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchBrand = dispatch => async uuid => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'brand'
    });
    const response = await weedstrueAPI.get(`/api/brands/${uuid}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'brand',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brand',
      payload: 'Oops something went wrong.'
    });
  }
};

const importBrands = dispatch => async brands => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'brands'
    });

    const response = await weedstrueAPI.post('/api/brands/import', { brands });

    dispatch({
      type: 'SUCCESS',
      stateName: 'brands',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'brands',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchProductFilters = dispatch => async () => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'productFilters'
    });

    const response = await weedstrueAPI.get('/api/products/filters');
    dispatch({
      type: 'SUCCESS',
      stateName: 'productFilters',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'productFilters',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchProducts =
  dispatch =>
  async (
    { fkProductType, sortBy, orderBy, fkBrand, skip },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      if (!skip) {
        dispatch({
          type: 'FETCHING',
          stateName: 'products'
        });
      }

      const response = await weedstrueAPI.get('/api/products', {
        params: {
          fkProductType,
          sortBy,
          orderBy,
          fkBrand,
          skip
        }
      });
      if (skip) {
        dispatch({
          type: 'APPEND',
          stateName: 'products',
          payload: response.data.data
        });
      } else {
        dispatch({
          type: 'SUCCESS',
          stateName: 'products',
          payload: { value: response.data.data }
        });
      }
      if (onSuccessCallback) {
        onSuccessCallback(response.data.totalCount);
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback();
      }
      dispatch({
        type: 'ERROR',
        stateName: 'products',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchProduct =
  dispatch => async (uuid, onSuccessCallback, onErrorCallback) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'product'
      });
      const response = await weedstrueAPI.get(`/api/products/${uuid}`);

      dispatch({
        type: 'SUCCESS',
        stateName: 'product',
        payload: { value: response.data }
      });

      dispatch({
        type: 'SUCCESS',
        stateName: 'userPosts',
        payload: { value: response.data.userPosts.data }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      const message = getErrorMessage(e);
      if (onErrorCallback) {
        onErrorCallback(message);
      }
      dispatch({
        type: 'ERROR',
        stateName: 'product',
        payload: 'Oops something went wrong.'
      });
    }
  };

const syncProduct =
  dispatch =>
  async (
    { name, productType, description, brand, links, images, productAttributes },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      dispatch({
        type: 'FETCHING',
        stateName: 'product'
      });

      const response = await weedstrueAPI.post('/api/products/sync', {
        name,
        productType,
        description,
        brand,
        links,
        images,
        productAttributes
      });

      dispatch({
        type: 'SUCCESS',
        stateName: 'product',
        payload: { value: response.data }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (e) {
      if (onErrorCallback) {
        onErrorCallback(e);
      }
      dispatch({
        type: 'ERROR',
        stateName: 'product',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchUserPosts =
  dispatch =>
  async (
    {
      fkUserPostType,
      sortBy,
      orderBy,
      skip,
      fkBrand,
      fkProduct,
      fkUser,
      showFollowingOnly
    },
    onSuccessCallback,
    onErrorCallback
  ) => {
    try {
      if (!skip) {
        dispatch({
          type: 'FETCHING',
          stateName: 'userPosts'
        });
      }

      const response = await weedstrueAPI.get('/api/userPosts', {
        params: {
          fkUserPostType,
          sortBy,
          orderBy,
          skip,
          fkBrand,
          fkProduct,
          fkUser,
          showFollowingOnly
        }
      });
      if (skip) {
        dispatch({
          type: 'APPEND',
          stateName: 'userPosts',
          payload: response.data.data
        });
      } else {
        dispatch({
          type: 'SUCCESS',
          stateName: 'userPosts',
          payload: { value: response.data.data }
        });
      }
      if (onSuccessCallback) {
        onSuccessCallback(response.data.totalCount);
      }
    } catch (e) {
      dispatch({
        type: 'ERROR',
        stateName: 'userPosts',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchUserPost = dispatch => async uuid => {
  try {
    dispatch({
      type: 'FETCHING',
      stateName: 'userPost'
    });
    const response = await weedstrueAPI.get(`/api/userPosts/${uuid}`);

    dispatch({
      type: 'SUCCESS',
      stateName: 'userPost',
      payload: { value: response.data }
    });

    dispatch({
      type: 'SUCCESS',
      stateName: 'comments',
      payload: { value: response.data.comments ?? [] }
    });
  } catch (e) {
    dispatch({
      type: 'ERROR',
      stateName: 'userPost',
      payload: 'Oops something went wrong.'
    });
  }
};

export const { Provider, Context } = createProvider(
  reducer,
  {
    fetchBrands,
    fetchBrand,
    fetchUserPosts,
    fetchUserPost,
    fetchProduct,
    fetchProductFilters,
    fetchProducts,
    importBrands,
    syncProduct,
    syncBrand
  },
  initialState
);
