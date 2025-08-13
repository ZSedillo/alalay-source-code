import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
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
        posts: [action.payload, ...state.posts], // new post first
      };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
