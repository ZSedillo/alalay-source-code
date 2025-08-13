import { 
    FEED_REQUEST, 
    FEED_SUCCESS, 
    FEED_FAIL 
} from '../_constants/feed.constants';

const API = 'http://localhost:3000';

export const getUserFeed = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: FEED_REQUEST });

    const res = await fetch(`${API}/posts?page=${page}`, {
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch feed');

    // No mapping, we keep description as-is from backend
    dispatch({ type: FEED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FEED_FAIL, payload: error.message });
  }
};
