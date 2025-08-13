import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { tempListReducer } from '../_reducers/temp.reducer';
import { userReducer, scholarsReducer, scholarProfileReducer } from '../_reducers/user.reducer';
import { feedReducer } from '../_reducers/feed.reducer';

const rootReducer = combineReducers({
  tempList: tempListReducer,
  user: userReducer,
  scholars: scholarsReducer,
  scholarProfile: scholarProfileReducer,
  feed: feedReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;