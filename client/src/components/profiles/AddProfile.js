import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProfile } from '../../actions/profileActions';

const AddProfile = ({ addProfile }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    phone: ''
  });

  const { name, email, description, phone } = profile;

  const onSubmit = () => {
    if (name === '' || email === '') {
      M.toast({ html: 'Name and email are required fields' });
    } else {
      const newProfile = {
        name,
        email,
        description,
        phone
      };

      addProfile(newProfile);
      M.toast({ html: 'New profile added' });

      // Clear form fields
      setProfile({});
    }
  };

  const onChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div id="add-profile-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add New Profile</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="name" value={name} onChange={onChange} />
            <label htmlFor="name" className="active">
              Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="email" value={email} onChange={onChange} />
            <label htmlFor="email">Email</label>
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
            <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input type="text" name="phone" value={phone} onChange={onChange} />
            <label htmlFor="phone">Phone</label>
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

AddProfile.propTypes = {
  addProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProfile }
)(AddProfile);
