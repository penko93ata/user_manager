import {
  GET_PROFILES,
  // PROFILES_ERROR,
  ADD_PROFILE,
  SET_LOADING,
  DELETE_PROFILE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PROFILE,
  SEARCH_PROFILES,
  CLEAR_SEARCH
} from './types';
import axios from 'axios';

// Get all profiles from API
export const getProfiles = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    // dispatch({
    //   type: PROFILES_ERROR,
    //   payload: err.response.msg
    // });
  }
};

export const addProfile = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    setLoading();

    const res = await axios.post('/api/profile', profile, config);
    dispatch({
      type: ADD_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    // dispatch({
    //   type: PROFILES_ERROR,
    //   payload: err.response.msg
    // });
  }
};

export const deleteProfile = id => async dispatch => {
  try {
    setLoading();

    await axios.delete(`/api/profile/${id}`);
    dispatch({
      type: DELETE_PROFILE,
      payload: id
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const setCurrentProfile = profile => {
  return {
    type: SET_CURRENT,
    payload: profile
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT
  };
};

export const updateProfile = profile => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    setLoading();

    const res = await axios.put(`/api/profile/${profile._id}`, profile, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Search profiles
export const searchProfiles = text => dispatch => {
  dispatch({
    type: SEARCH_PROFILES,
    payload: text
  });
};

// Clear search
export const clearSearch = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH });
};
