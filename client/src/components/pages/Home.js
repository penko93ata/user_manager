import React, { useEffect } from 'react';
import Profiles from '../profiles/Profiles';
import AddButton from '../layout/AddButton';
import AddProfile from '../profiles/AddProfile';
import EditProfile from '../profiles/EditProfile';
import SearchBar from '../layout/SearchBar';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const Home = ({ isAuthenticated, history }) => {
  useEffect(() => {
    loadUser();
    // if (!isAuthenticated) {
    //   history.push('/login');
    // }
    // es-lint-disable-next-line
  }, []);

  return (
    <div>
      <SearchBar />
      <AddButton />
      <AddProfile />
      <EditProfile />
      <Profiles />
    </div>
  );
};

const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapPropsToState,
  { useEffect }
)(Home);
