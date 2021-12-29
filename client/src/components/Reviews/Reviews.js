import React, { useState } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { submitReview } from '../../containers/ProductsContainer/store/productsAction';
import Ratings from '../Ratings/Ratings';
import Button from '../Button/Button';

const Reviews = ({ postReview, userData, newRating }) => {
  const { productId } = useParams();
  const [review, setReview] = useState('');
  const productDetails = {
    user: userData && userData._id,
    product: productId,
    rating: newRating,
    review,
  };

  const changeReviewHandler = e => setReview(e.target.value);

  const submitReview = async () => {
    await postReview(productDetails);
    window.location.reload();
  };

  return (
    <>
      <h3>Write a product review</h3>
      {productDetails.user === undefined ? (
        'Please log in to review'
      ) : (
        <>
          <Ratings check={1} />
          <InputGroup className="mt-3">
            <FormControl
              rows={4}
              as="textarea"
              aria-label="With textarea"
              onChange={changeReviewHandler}
            />
            <InputGroup.Prepend>
              <Button
                disableButton={!productDetails.rating || !productDetails.review}
                buttonText="Submit"
                buttonColor="warning"
                clickMe={submitReview}
              />
            </InputGroup.Prepend>
          </InputGroup>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.authReducer.userData,
    newRating: state.productsReducer.rating,
    status: state.productsReducer.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postReview: productDetails => dispatch(submitReview(productDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
