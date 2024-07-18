import { configureStore, combineReducers } from '@reduxjs/toolkit';
import dataReducerLogin from '@configRedux/reducers/reducerLogin';
import dataReducerBalance from '@configRedux/reducers/reducerBalance';
import dataReducerService from '@configRedux/reducers/reducerService';
import dataReducerAuth from '@configRedux/reducers/auth/reducerAuth';



// Combine reducers
const rootReducer = combineReducers({
  dataLogin: dataReducerLogin,
  dataBalance: dataReducerBalance,
  dataService: dataReducerService,
  dataAuth: dataReducerAuth
});

// Configure the store with the combined reducers
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
