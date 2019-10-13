import React, { Fragment, useEffect } from 'react';
import Profiles from '../profiles/Profiles';
import AddButton from '../layout/AddButton';
import AddProfile from '../profiles/AddProfile';
import EditProfile from '../profiles/EditProfile';
import SearchBar from '../layout/SearchBar';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
    // es-lint-disable-next-line
  }, [loadUser]);

  return (
    <Fragment>
      <SearchBar />
      <AddButton />
      <AddProfile />
      <EditProfile />
      <Profiles />
    </Fragment>
  );
};

export default connect(
  null,
  { loadUser }
)(Home);
