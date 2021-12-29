import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './utils/PrivateRoute';
import { loggedInUser } from '../AuthContainer/Store/AuthContainerActions';

import NavigationBar from '../../components/Navbar/Navbar';

// CONTAINERS
import MainContainer from '../MainContainer/mainContainer';
import DiscountItems from '../DiscountContainer/DiscountContainer';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import ProductContainer from '../ProductContainer/ProductContainer';
import LoginContainer from '../AuthContainer/LoginContainer/LoginContainer';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import CartContainer from '../CartContainer/CartContainer';

const App = ({ loggedInUser }) => {
  useEffect(() => {
    loggedInUser();
  }, []); // eslint-disable-line

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <PrivateRoute path="/my-profile" component={ProfileContainer} />
        <Route path="/sale" component={DiscountItems} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/products/:productId" component={ProductContainer} />
        <Route path="/products" component={ProductsContainer} />
        <Route exact path="/" component={MainContainer} />
        <Route render={() => <h1>Page not found.</h1>} />
      </Switch>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loggedInUser: () => dispatch(loggedInUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
