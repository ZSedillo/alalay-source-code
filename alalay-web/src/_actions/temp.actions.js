// src/actions/temp.actions.js
import {
  TEMP_LIST_REQUEST,
  TEMP_LIST_SUCCESS,
  TEMP_LIST_FAIL,
} from '../_constants/temp.constants';

export const listTemps = () => async (dispatch) => {
  try {
    dispatch({ type: TEMP_LIST_REQUEST });

    const response = await fetch('http://localhost:3000/temp'); // replace with real URL
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: TEMP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEMP_LIST_FAIL,
      payload: error.message,
    });
  }
};
