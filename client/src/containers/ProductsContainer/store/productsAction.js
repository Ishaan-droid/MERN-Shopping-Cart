import axios from 'axios';
import constants from './productsConstants';

export const allProducts = filters => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/v1/mern-shopping-cart/products?${filters}`);
      const { data } = response;

      return dispatch({
        type: constants.ALL_PRODUCTS,
        payload: {
          data: data.data.results,
          status: data.status,
        },
      });
    } catch (err) {
      return dispatch({
        type: constants.ALL_PRODUCTS_ERROR,
        payload: {
          message: 'It seems the internet connection is weak. Try refreshing the page.',
        },
      });
    }
  };
};

export const getProduct = productId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/v1/mern-shopping-cart/products/${productId}`);
      const { data } = response;

      return dispatch({
        type: constants.ONE_PRODUCT,
        payload: {
          data: data.data.results,
          status: data.status,
        },
      });
    } catch (err) {
      return dispatch({
        type: constants.ONE_PRODUCT_ERROR,
        payload: {
          message: 'It seems the internet connection is weak. Try refreshing the page.',
        },
      });
    }
  };
};

export const submitReview = productDetails => {
  return async dispatch => {
    try {
      const response = await axios.post(
        '/api/v1/mern-shopping-cart/reviews/createReview',
        productDetails
      );
      const { data } = response;

      return dispatch({
        type: constants.SUBMIT_REVIEW,
        payload: {
          data: data.data.results,
          status: data.status,
        },
      });
    } catch (err) {
      const {
        response: { data },
      } = err;

      return dispatch({
        type: constants.SUBMIT_REVIEW_ERROR,
        payload: {
          message: data.message,
          status: data.status,
        },
      });
    }
  };
};

export const allReviews = () => {
  return async dispatch => {
    const response = await axios.get('/api/v1/mern-shopping-cart/reviews');
    const { data } = response;

    return dispatch({
      type: constants.ALL_REVIEWS,
      payload: {
        reviews: data.data.results,
        status: data.status,
      },
    });
  };
};

export const addToCart = (productId, title, summary, stock, currentPrice, image) => {
  return dispatch => {
    return dispatch({
      type: constants.CART,
      payload: {
        productId,
        title,
        summary,
        stock,
        currentPrice,
        image,
      },
    });
  };
};

export const deleteItemFromCart = (productId, newCartItems) => {
  return dispatch => {
    return dispatch({
      type: constants.DELETE_ITEM_FROM_CART,
      payload: {
        productId,
        items: newCartItems,
      },
    });
  };
};
