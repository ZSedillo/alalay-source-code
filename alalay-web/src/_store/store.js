import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { tempListReducer } from '../_reducers/temp.reducer';
import { userReducer } from '../_reducers/user.reducer'; // ⬅️ update path as needed

const rootReducer = combineReducers({
  tempList: tempListReducer,
  user: userReducer, // ⬅️ add user reducer here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
