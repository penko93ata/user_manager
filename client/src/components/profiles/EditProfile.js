import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../actions/profileActions';

const EditProfile = ({ current, updateProfile }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    phone: ''
  });

  const { name, email, description, phone } = profile;

  useEffect(() => {
    if (current) {
      setProfile(current);
    }
  }, [current]);

  const onSubmit = () => {
    if (name === '' || email === '') {
      M.toast({ html: 'Name and email are required fields' });
    } else {
      const currentProfile = {
        _id: current._id,
        name,
        email,
        description,
        phone,
        date: new Date()
      };

      updateProfile(currentProfile);
      M.toast({ html: 'Profile updated' });

      // Clear form fields
      setProfile({});
    }
  };

  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div id="edit-profile-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Profile</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="name" value={name} onChange={onChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="email" value={email} onChange={onChange} />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="phone" value={phone} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditProfile.propTypes = {
  current: PropTypes.object,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.profile.current
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(EditProfile);
