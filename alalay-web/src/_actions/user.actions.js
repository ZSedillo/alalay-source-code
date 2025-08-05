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
  USER_PROFILE_FAIL
} from '../_constants/user.constants';

const API = 'http://localhost:3000'; // adjust as needed

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const res = await fetch(`${API}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ⬅️ CRITICAL: includes cookie in request
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    dispatch({ type: USER_LOGIN_SUCCESS });

    // ✅ fetch the logged in user from cookie/session
    dispatch(fetchCurrentUser());
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const res = await fetch(`${API}/user/current-user`, {
      credentials: 'include', // ⬅️ CRUCIAL
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
