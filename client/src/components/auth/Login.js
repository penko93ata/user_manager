import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import setAuthToken from '../setAuthToken';

const Login = ({ login, clearErrors, error, isAuthenticated, history }) => {
  useEffect(() => {
    if (isAuthenticated) {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      history.push('/');
    }

    if (error === 'Invalid Credentials') {
      // alert
      M.toast({ html: error });
      clearErrors();
    }

    if (error === 'Invalid request payload input') {
      M.toast({ html: 'Please enter valid email and password' });
      clearErrors();
    }
  }, [isAuthenticated, history, clearErrors, error]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      M.toast({ html: 'Please fill in email and password' });
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <h1>Login Form</h1>
        <form className="col s12" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                type="email"
                className="validate"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                type="password"
                className="validate"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" type="submit">
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
