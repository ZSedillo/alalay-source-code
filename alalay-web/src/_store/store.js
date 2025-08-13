import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { tempListReducer } from '../_reducers/temp.reducer';
import { userReducer, scholarsReducer, scholarProfileReducer } from '../_reducers/user.reducer'; // ✅ Import all reducers

const rootReducer = combineReducers({
  tempList: tempListReducer,
  user: userReducer,
  scholars: scholarsReducer,
  scholarProfile: scholarProfileReducer, // ✅ Add scholar profile reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;