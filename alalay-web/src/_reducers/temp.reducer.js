// src/reducers/temp.reducer.js
import {
  TEMP_LIST_REQUEST,
  TEMP_LIST_SUCCESS,
  TEMP_LIST_FAIL,
} from '../_constants/temp.constants';

const initialState = {
  temps: [],
  loading: false,
  error: null,
};

export const tempListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMP_LIST_REQUEST:
      return { ...state, loading: true };
    case TEMP_LIST_SUCCESS:
      return { loading: false, temps: action.payload, error: null };
    case TEMP_LIST_FAIL:
      return { loading: false, temps: [], error: action.payload };
    default:
      return state;
  }
};
