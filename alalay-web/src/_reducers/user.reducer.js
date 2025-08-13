import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  GET_SCHOLARS_REQUEST,
  GET_SCHOLARS_SUCCESS,
  GET_SCHOLARS_FAIL,
  GET_SCHOLAR_PROFILE_REQUEST,
  GET_SCHOLAR_PROFILE_SUCCESS,
  GET_SCHOLAR_PROFILE_FAIL,
  CLEAR_SCHOLAR_PROFILE,
} from '../_constants/user.constants';

const initialUserState = {
  loading: false,
  user: null,
  error: null,
  loaded: false // tells if session check is completed
};

export const userReducer = (state = initialUserState, action) => {
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
      return { ...initialUserState, loaded: true }; // keep loaded true even after logout

    default:
      return state;
  }
};

// Scholars reducer
const initialScholarsState = {
  scholars: [],
  loading: false,
  error: null
};

export const scholarsReducer = (state = initialScholarsState, action) => {
  switch (action.type) {
    case GET_SCHOLARS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_SCHOLARS_SUCCESS:
      return { ...state, loading: false, scholars: action.payload, error: null };

    case GET_SCHOLARS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// ✅ NEW: Scholar profile reducer
const initialScholarProfileState = {
  scholarProfile: null,
  loading: false,
  error: null
};

export const scholarProfileReducer = (state = initialScholarProfileState, action) => {
  switch (action.type) {
    case GET_SCHOLAR_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_SCHOLAR_PROFILE_SUCCESS:
      return { ...state, loading: false, scholarProfile: action.payload, error: null };

    case GET_SCHOLAR_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload, scholarProfile: null };

    case CLEAR_SCHOLAR_PROFILE:
      return initialScholarProfileState;

    default:
      return state;
  }
};