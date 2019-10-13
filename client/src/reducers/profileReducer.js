import {
  GET_PROFILES,
  ADD_PROFILE,
  PROFILES_ERROR,
  SET_LOADING,
  DELETE_PROFILE,
  UPDATE_PROFILE,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_PROFILES,
  CLEAR_SEARCH
} from '../actions/types';

const initialState = {
  profiles: null,
  current: null,
  loading: false,
  erorr: null,
  filtered: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        loading: false
      };
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          profile => profile._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile._id === action.payload._id ? action.payload : profile
        )
      };
    case SEARCH_PROFILES:
      return {
        ...state,
        filtered: state.profiles.filter(profile => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            profile.name.match(regex) ||
            profile.email.match(regex) ||
            profile.description.match(regex)
          );
        })
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        filtered: null
      };
    case PROFILES_ERROR:
      return {
        ...state,
        erorr: action.payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loadng: true
      };
    default:
      return state;
  }
};
