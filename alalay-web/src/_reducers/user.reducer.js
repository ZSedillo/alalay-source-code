import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL
} from '../_constants/user.constants';

const initialState = {
  loading: false,
  user: null,
  error: null,
  loaded: false // ✅ NEW: tells if session check is completed
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, error: null };

    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null, loaded: true };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload, loaded: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };

    case USER_LOGOUT:
      return { ...initialState, loaded: true }; // ✅ keep loaded true even after logout

    default:
      return state;
  }
};
