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
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  user: null,
  error: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };

    case USER_LOGOUT:
      return { ...initialState, userInfo: null };

    case USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload };

    case USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
