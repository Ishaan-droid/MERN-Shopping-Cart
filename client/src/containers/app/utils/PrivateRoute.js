import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, status, ...rest }) => {
  console.log(status);
  return (
    <Route
      {...rest}
      render={props => (status === 'Success' ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    status: state.authReducer.status,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
