import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { allProducts } from './store/productsAction';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';

const ProductsContainer = ({
  getAllProducts,
  allProducts,
  spinner,
  location: { vegProducts, nonVegProducts },
}) => {
  useEffect(() => {
    (async () => {
      if (vegProducts) await getAllProducts(vegProducts);
      else if (nonVegProducts) await getAllProducts(nonVegProducts);
      else await getAllProducts();
    })();
  }, [vegProducts || nonVegProducts]); // eslint-disable-line

  const history = useHistory();

  const [params, setParams] = useState({
    price: '',
    category: '',
  });

  const changePrice = e => {
    setParams(prevParams => {
      return {
        ...prevParams,
        price: e.target.value === 'Filter by Price' ? '' : e.target.value,
      };
    });
  };

  const changeCategory = e => {
    setParams(prevParams => {
      return {
        ...prevParams,
        category: e.target.value === 'Filter by Category' ? '' : e.target.value,
      };
    });
  };

  const { price, category } = params;

  const applyFilter = () => {
    let filters;
    if (vegProducts) {
      filters = `sort=${price}&${vegProducts}`;
    } else if (nonVegProducts) {
      filters = `sort=${price}&${nonVegProducts}`;
    } else {
      filters = `sort=${price}&category=${category}`;
    }
    return getAllProducts(filters);
  };

  return (
    <div className="my-container">
      <h1 className="heading-font-size text-center mb-3">All Products 🚀</h1>
      <Row
        noGutters
        className="d-flex flex-column align-items-center justify-content-evenly mb-3 mt-3 pt-4 pb-4"
      >
        <div className="bg-dark p-5">
          <h3 style={{ color: '#ffc107' }}>Filter Products</h3>
          <Select
            defaultChoice="Filter by Price"
            choiceOne="Low to high"
            choiceTwo="High to Low"
            valueOne="currentPrice"
            valueTwo="-currentPrice"
            changeFilter={changePrice}
          />
          {vegProducts || nonVegProducts ? null : (
            <Select
              defaultChoice="Filter by Category"
              choiceOne="Vegetarian"
              choiceTwo="Non-Vegetarian"
              valueOne="Vegetarian"
              valueTwo="Non-Vegetarian"
              changeFilter={changeCategory}
            />
          )}
          <Button buttonText="Apply" buttonColor="warning" blockLength clickMe={applyFilter} />
        </div>
      </Row>
      {spinner ? (
        <Spinner animation="border" />
      ) : (
        <Row noGutters>
          {allProducts &&
            allProducts.map(cur => (
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
    allProducts: state.productsReducer.allProducts,
    status: state.productsReducer.status,
    spinner: state.productsReducer.spinner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: filters => dispatch(allProducts(filters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
