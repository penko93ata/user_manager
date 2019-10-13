import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteProfile, setCurrentProfile } from '../../actions/profileActions';

const ProfileItem = ({ profile, deleteProfile, setCurrentProfile }) => {
  const onDelete = () => {
    deleteProfile(profile._id);
    M.toast({ html: 'Profile Deleted' });
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#edit-profile-modal"
          className="modal-trigger blue-text"
          onClick={() => setCurrentProfile(profile)}
        >
          {profile.name}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">{profile.description}</span>
        </span>
        <p>
          Email: {profile.email} | Phone: {profile.phone}
          <a href="#!" onClick={onDelete} className="secondary-content">
            <i className="material-icons grey-text">delete</i>
          </a>
        </p>
      </div>
    </li>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  setCurrentProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProfile, setCurrentProfile }
)(ProfileItem);
