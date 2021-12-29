import constants from './productsConstants';

const initialState = {
  allProducts: [],
  status: '',
  allProductsError: [false, ''],
  spinner: true,
  oneProduct: [],
  oneProductError: [false, ''],
  rating: undefined,
  userReview: {},
  userReviewError: '',
  allReviews: [],
  cart: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload.data,
        status: action.payload.status,
        spinner: false,
      };
    case constants.ALL_PRODUCTS_ERROR:
      return {
        status: 'Fail',
        allProductsError: [true, action.payload.message],
        spinner: false,
      };
    case constants.ONE_PRODUCT:
      return {
        ...state,
        oneProduct: action.payload.data,
        status: action.payload.status,
        spinner: false,
      };
    case constants.ONE_PRODUCT_ERROR:
      return {
        status: 'Fail',
        oneProductError: [true, action.payload.message],
        spinner: false,
      };
    case constants.NEW_RATING:
      return {
        ...state,
        rating: action.newRating,
      };
    case constants.SUBMIT_REVIEW:
      return {
        ...state,
        userReview: action.payload.data,
        status: action.payload.status,
      };
    case constants.SUBMIT_REVIEW_ERROR:
      return {
        ...state,
        userReviewError: action.payload.message,
        status: action.payload.status,
      };
    case constants.ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.payload.reviews,
        status: action.payload.status,
      };
    case constants.CART:
      return {
        ...state,
        cart: state.cart.concat({
          productId: action.payload.productId,
          title: action.payload.title,
          summary: action.payload.summary,
          stock: action.payload.stock,
          currentPrice: action.payload.currentPrice,
          image: action.payload.image,
        }),
      };
    case constants.DELETE_ITEM_FROM_CART:
      return {
        ...state,
        cart: [...action.payload.items],
      };
    default:
      return state;
  }
};

export default productsReducer;
