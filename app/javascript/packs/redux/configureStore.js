import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Accounts } from './accounts';
import { Tariffs } from './tariffs';
import { Categories } from './categories';
import { Utilities } from './utilities';
import { Flats } from './flats';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        accounts: Accounts,
        tariffs: Tariffs,
        categories: Categories,
        flats: Flats,
        utilities: Utilities
      }),
      applyMiddleware(thunk, logger)
  );
  return store;
};
