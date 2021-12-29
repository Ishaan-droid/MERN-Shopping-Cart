import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { discountItems } from '../MainContainer/store/mainContainerActions';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import { Row, Col } from 'react-bootstrap';

const DiscountItems = ({ discountItems, discountProducts, spinner }) => {
  useEffect(() => {
    (async () => {
      await discountItems();
    })();
  }, []); // eslint-disable-line

  const history = useHistory();

  return (
    <div className="my-container">
      <h1 className="heading-font-size text-center mb-3">SUMMER SALE 🤑</h1>
      {spinner ? (
        <Spinner animation="border" />
      ) : (
        <Row noGutters>
          {discountProducts &&
            discountProducts.map(cur => (
              <Col key={cur._id} lg={4} md={6} className="d-flex flex-row justify-content-center">
                <Card
                  cardImage={cur.image}
                  title={cur.title}
                  stock={cur.stock}
                  category={cur.category}
                  currentPrice={cur.currentPrice}
                  discount={cur.discount}
                  originalPrice={cur.originalPrice}
                  summary={cur.summary}
                  btnText="View"
                  viewProduct={() => history.push(`/products/${cur._id}`)}
                />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    discountProducts: state.mainContainerReducer.discountProducts,
    spinner: state.mainContainerReducer.spinner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    discountItems: () => dispatch(discountItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscountItems);
