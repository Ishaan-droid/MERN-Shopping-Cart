import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { allReviews, getProduct, addToCart } from '../ProductsContainer/store/productsAction';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import Ratings from '../../components/Ratings/Ratings';
import Reviews from '../../components/Reviews/Reviews';

const ProductsContainer = ({
  getProduct,
  getAllReviews,
  addToCart,
  product,
  spinner,
  allReviews,
}) => {
  useEffect(() => {
    (async () => {
      await getProduct(productId);
      await getAllReviews();
    })();
  }, []); // eslint-disable-line

  const { productId } = useParams();
  const history = useHistory();

  const productReviews = allReviews && allReviews.filter(cur => cur.product === productId);

  const {
    image,
    title,
    summary,
    stock,
    discount,
    originalPrice,
    currentPrice,
    description,
    ratings,
  } = product || {};

  const addItemsToCart = () => {
    addToCart(productId, title, summary, stock, currentPrice, image);
    history.push('/cart');
  };

  return (
    <>
      {spinner ? (
        <Spinner animation="border" />
      ) : (
        product && (
          <Container>
            <Row className="mt-4">
              <Col lg={6}>
                <img className="w-100 mb-4" src={image} alt={title} />
              </Col>
              <Col lg={6} className="d-flex flex-column">
                <h2 className="mb-3">
                  {title} | {summary}
                </h2>
                {stock <= 5 ? (
                  <h3 className="mb-3" style={{ color: 'var(--main-red-color)' }}>
                    Only {stock} left 😬
                  </h3>
                ) : (
                  <h3 className="mb-3 in-stock">In Stock 🔥</h3>
                )}
                {discount ? (
                  <h4 className="mb-3">
                    <span className="old-price"> ₹{originalPrice}</span> now ₹{currentPrice}
                  </h4>
                ) : (
                  <h4 className="mb-3">₹{currentPrice}</h4>
                )}
                <h6 className="mb-3">{description}</h6>
                <div className="d-flex flex-row mb-4">
                  <Ratings productRating={ratings} check={2} />
                  <h6 className="ml-3 mt-2">{ratings}</h6>
                </div>
                <Button buttonText="Add to Cart" buttonColor="dark" clickMe={addItemsToCart} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Reviews />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <h3 className="text-center">Reviews</h3>
                {productReviews &&
                  productReviews.map(cur => {
                    return (
                      <div key={cur._id} className="all-reviews">
                        <h4 className="mt-4">{cur.user.name}</h4>
                        <p className="mb-1">Reviewed on {cur.createdAt.slice(0, 10)}</p>
                        <p>{cur.review}</p>
                      </div>
                    );
                  })}
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    product: state.productsReducer.oneProduct,
    spinner: state.productsReducer.spinner,
    productError: state.productsReducer.oneProductError,
    status: state.productsReducer.status,
    allReviews: state.productsReducer.allReviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getProduct(productId)),
    getAllReviews: () => dispatch(allReviews()),
    addToCart: (...product) => dispatch(addToCart(...product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
