import dataReducer from './reducer';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dataReducerAuth from '@configRedux/reducers/auth/reducerAuth';

const rootReducer = combineReducers({
  data: dataReducer,
  dataAuth: dataReducerAuth,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
