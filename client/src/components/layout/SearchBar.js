import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchProfiles, clearSearch } from '../../actions/profileActions';

const SearchBar = ({ searchProfiles, clearSearch, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      searchProfiles(e.target.value);
    } else {
      console.log('Fire clearSearch()');
      clearSearch();
    }
  };

  return (
    <div className="input-field">
      <input
        id="search"
        type="search"
        placeholder="Search Profiles..."
        ref={text}
        onChange={onChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filtered: state.profile.filtered
});

export default connect(
  mapStateToProps,
  { searchProfiles, clearSearch }
)(SearchBar);
