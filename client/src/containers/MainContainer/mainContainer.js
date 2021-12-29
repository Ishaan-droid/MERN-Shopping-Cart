import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import { hotSellingProducts } from './store/mainContainerActions';

// COMPONENTS
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';

// STYLES
import { Row, Col } from 'react-bootstrap';
import online_grocerries from '../../images/online_grocerries.png';
import { FcSalesPerformance } from 'react-icons/fc';

const MainContainer = ({ hotSellingProducts, products, spinner }) => {
  useEffect(() => {
    (async () => {
      await hotSellingProducts();
    })();
  }, []); // eslint-disable-line

  const history = useHistory();

  return (
    <div className="my-container">
      <div>{products && <Carousel carouselProducts={products} />}</div>
      <Row noGutters>
        <Col lg={6} className="d-flex justify-content-center">
          <img className="w-75" src={online_grocerries} alt="Online Grocerries" />
        </Col>
        <Col lg={6} className="d-flex flex-column justify-content-center align-items-center mb-15">
          <h1 className="heading-font-size mb-2">Shop Now!</h1>
          <h2 className="secondary-heading-font-size mb-3">
            Summer Cooler Sale on <FcSalesPerformance />
          </h2>
          <Link to="/sale">
            <Button buttonText="View Sale Items" buttonColor="warning" buttonSize="lg" />
          </Link>
        </Col>
      </Row>
      <Row noGutters className="d-flex justify-content-center">
        <h4 className="secondary-heading-font-size mt-5 mb-5">HOT-SELLERS! 🔥</h4>
      </Row>
      {spinner ? (
        <Spinner animation="border" />
      ) : (
        <Row noGutters>
          {products &&
            products.map(cur => (
              <Col lg={4} md={6} className="d-flex flex-row justify-content-center" key={cur._id}>
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
    products: state.mainContainerReducer.products,
    status: state.mainContainerReducer.status,
    spinner: state.mainContainerReducer.spinner,
    productsError: state.mainContainerReducer.productsError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hotSellingProducts: () => dispatch(hotSellingProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
