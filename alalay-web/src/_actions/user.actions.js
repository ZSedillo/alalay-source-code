// _actions/user.actions.js
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

const API = 'http://localhost:3000'; // adjust as needed

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const res = await fetch(`${API}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // CRITICAL: includes cookie in request
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    dispatch({ type: USER_LOGIN_SUCCESS });

    // fetch the logged in user from cookie/session
    dispatch(fetchCurrentUser());
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const res = await fetch(`${API}/user/current-user`, {
      credentials: 'include', // CRUCIAL
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch user');

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const res = await fetch(`${API}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');

    dispatch({ type: USER_REGISTER_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await fetch(`${API}/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error('Logout request failed:', err);
  }

  dispatch({ type: USER_LOGOUT });
};

// Get all scholars
export const getScholars = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SCHOLARS_REQUEST });

    const res = await fetch(`${API}/user/scholars`, { 
      credentials: "include" 
    });
    
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch scholars");

    // The backend returns an array directly
    dispatch({ type: GET_SCHOLARS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SCHOLARS_FAIL, payload: error.message });
  }
};

// ✅ NEW: Get individual scholar profile
export const getScholarProfile = (scholarId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SCHOLAR_PROFILE_REQUEST });

    const res = await fetch(`${API}/user/scholars/${scholarId}`, {
      credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch scholar profile");

    dispatch({ type: GET_SCHOLAR_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SCHOLAR_PROFILE_FAIL, payload: error.message });
  }
};

// ✅ NEW: Clear scholar profile (useful when navigating away)
export const clearScholarProfile = () => ({
  type: CLEAR_SCHOLAR_PROFILE
});