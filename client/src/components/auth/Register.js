import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import setAuthToken from '../setAuthToken';

import { register, clearErrors } from '../../actions/authActions';

const Register = ({ register, isAuthenticated, error, history }) => {
  useEffect(() => {
    if (isAuthenticated) {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      history.push('/');
    }

    if (error === 'User already exists') {
      // alert
      M.toast({ html: error });
      clearErrors();
    }

    if (error === 'Invalid request payload input') {
      M.toast({ html: 'Please enter valid email and password' });
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      M.toast({ html: 'Please enter all fields' });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <h1>Register Form</h1>
        <form className="col s12" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="name"
                type="text"
                className="validate"
                value={name}
                onChange={onChange}
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
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
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password2"
                type="password"
                className="validate"
                value={password2}
                onChange={onChange}
              />
              <label htmlFor="password2">Confirm Password</label>
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

Register.propTypes = {
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register);
