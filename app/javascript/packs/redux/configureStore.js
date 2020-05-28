import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Accounts } from './accounts';
import { Tariffs } from './tariffs';
import { Utilities } from './utilities';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        accounts: Accounts,
        tariffs: Tariffs,
        utilities: Utilities
      }),
      applyMiddleware(thunk, logger)
  );
  return store;
}
