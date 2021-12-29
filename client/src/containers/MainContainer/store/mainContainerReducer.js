import constants from './mainContainerConstants';

const initialState = {
  status: '',
  products: [],
  productsError: [false, ''],
  spinner: true,
  discountProducts: [],
};

const mainContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.HOT_SELLING_PRODUCTS:
      return {
        products: action.payload.products,
        status: action.payload.status,
        spinner: false,
      };
    case constants.HOT_SELLING_PRODUCTS_ERROR:
      return {
        productsError: [true, action.payload.message],
        status: 'Fail',
        spinner: false,
      };
    case constants.DISCOUNT_ITEMS:
      return {
        discountProducts: action.payload.data,
        status: action.payload.status,
        spinner: false,
      };
    case constants.DISCOUNT_ITEMS_ERROR:
      return {
        productsError: [true, action.payload.message],
        status: 'Fail',
        spinner: false,
      };
    default:
      return state;
  }
};

export default mainContainerReducer;
