import React from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import constants from '../../containers/ProductsContainer/store/productsConstants';

const Ratings = ({ setNewRating, newRating, productRating, check }) => {
  return (
    <StarRatings
      rating={productRating || newRating}
      changeRating={check === 1 && (newRating => setNewRating(newRating))}
      starRatedColor="gold"
      starHoverColor="gold"
      starDimension="20px"
      starSpacing="2px"
      numberOfStars={5}
      name="rating"
    />
  );
};

const mapStateToProps = state => {
  return {
    newRating: state.productsReducer.rating,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNewRating: newRating =>
      dispatch({
        type: constants.NEW_RATING,
        newRating: newRating,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
