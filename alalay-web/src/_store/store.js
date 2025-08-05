import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ fixed import
import { tempListReducer } from '../_reducers/temp.reducer';

const rootReducer = combineReducers({
  tempList: tempListReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
