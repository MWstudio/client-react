import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import phone from 'store/modules/phone';
import modal from 'store/modules/modal';
import matchingRoom from './modules/matchingRoom';

const rootReducer = combineReducers({
  phone,
  modal,
  matchingRoom,
});

// make store
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});
