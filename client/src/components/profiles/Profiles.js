import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';

const Profiles = ({
  profile: { profiles, loading },
  getProfiles,
  filtered
}) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line
  }, []);

  if (loading || profiles === null) {
    return <Spinner />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">Profiles Collection</h4>
      </li>
      {!loading && profiles.length === 0 && profiles !== null ? (
        <p className="center">Add a new profile</p>
      ) : filtered !== null ? (
        filtered.map(profile => (
          <ProfileItem profile={profile} key={profile._id} />
        ))
      ) : (
        profiles.map(profile => (
          <ProfileItem profile={profile} key={profile._id} />
        ))
      )}
    </ul>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  filtered: state.profile.filtered
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
