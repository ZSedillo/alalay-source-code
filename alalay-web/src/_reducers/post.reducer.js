import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAIL,
} from '../_constants/post.constants';

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case TOGGLE_LIKE_REQUEST:
      return state; // could optimistically update if you want

    case TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                liked: action.payload.liked,
                likeCount: action.payload.likeCount,
              }
            : post
        ),
      };

    case TOGGLE_LIKE_FAIL:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
