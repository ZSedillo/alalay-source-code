import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from '../_constants/post.constants';

const API = 'http://localhost:3000';

export const createPost = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const res = await fetch(`${API}/posts/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // FormData allows file uploads
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create post');

    dispatch({ type: CREATE_POST_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.message });
  }
};
