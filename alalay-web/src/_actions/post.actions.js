import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
} from '../_constants/post.constants';

const API = 'http://localhost:3000';

// Existing createPost
export const createPost = (formData, token) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    const res = await fetch(`${API}/posts/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create post');

    dispatch({ type: CREATE_POST_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.message });
  }
};

// 🆕 Toggle Like Action
export const toggleLike = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_LIKE_REQUEST, payload: { postId } });

    const res = await fetch(`${API}/posts/like/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // no auth, using body
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to toggle like');

    dispatch({
      type: TOGGLE_LIKE_SUCCESS,
      payload: { postId, liked: data.liked, likeCount: data.likeCount },
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_LIKE_FAIL,
      payload: { postId, error: error.message },
    });
  }
};
