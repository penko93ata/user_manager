import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  user: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
