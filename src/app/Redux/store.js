import { configureStore } from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './mainReducer';

let reducer = combineReducers({
  main: mainReducer
});

export const store = configureStore({reducer}, applyMiddleware(thunk));
