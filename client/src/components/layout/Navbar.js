import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const Navbar = ({ logout, isAuthenticated }) => {
  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>Logout</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="material-icons">exit_to_app</i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="blue">
      <div className="nav-wrapper">
        <ul className="right">{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth
});

export default connect(
  mapPropsToState,
  { logout }
)(Navbar);
