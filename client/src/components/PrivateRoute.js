import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../actions/authActions';

const PrivateRoute = ({
  commponent: Component,
  isAuthenticated,
  loading,
  loadUser,
  ...rest
}) => {
  useEffect(() => {
    loadUser();
  });

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { loadUser }
)(PrivateRoute);
