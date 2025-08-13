import { FEED_REQUEST, FEED_SUCCESS, FEED_FAIL } from '../_constants/feed.constants';

const initialState = {
  posts: [],
  totalPages: 0,
  currentPage: 1,
  total: 0,
  loading: false,
  error: null
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_REQUEST:
      return { ...state, loading: true, error: null };

    case FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts || action.payload, // works for both array & paginated response
        totalPages: action.payload.totalPages || 1,
        currentPage: action.payload.currentPage || 1,
        total: action.payload.total || (Array.isArray(action.payload) ? action.payload.length : 0)
      };

    case FEED_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
