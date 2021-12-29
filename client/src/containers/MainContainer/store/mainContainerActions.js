import axios from 'axios';
import constants from './mainContainerConstants';

export const hotSellingProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/mern-shopping-cart/products/hot-selling-products');
      const { data } = response;

      return dispatch({
        type: constants.HOT_SELLING_PRODUCTS,
        payload: {
          products: data.data.results,
          status: data.status,
        },
      });
    } catch (err) {
      return dispatch({
        type: constants.HOT_SELLING_PRODUCTS_ERROR,
        payload: {
          message: 'It seems the internet connection is weak. Try refreshing the page.',
        },
      });
    }
  };
};

export const discountItems = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/v1/mern-shopping-cart/products/discountProducts');
      const { data } = response;

      return dispatch({
        type: constants.DISCOUNT_ITEMS,
        payload: {
          data: data.data.results,
          status: data.status,
        },
      });
    } catch (err) {
      return dispatch({
        type: constants.DISCOUNT_ITEMS_ERROR,
        payload: {
          message: 'It seems the internet connection is weak. Try refreshing the page.',
        },
      });
    }
  };
};
