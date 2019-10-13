import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadUser } from '../actions/authActions';

const PrivateRoute = ({
  isAuthenticated,
  loading,
  loadUser,
  user,
  component: Component,
  ...rest
}) => {
  // useEffect(() => {
  //   loadUser();
  // });

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
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { loadUser }
)(PrivateRoute);
