import React from 'react';

const AddButton = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-profile-modal"
        className="btn-floating btn-large blue draken-2 modal-trigger"
      >
        <i className="large material-icons">add</i>
      </a>
    </div>
  );
};

export default AddButton;
