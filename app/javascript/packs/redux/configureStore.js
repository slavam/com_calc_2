import {createStore, combineReducers} from 'redux';
import { Accounts } from './accounts';
import { Tariffs } from './tariffs';
import { Utilities } from './utilities';

export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        accounts: Accounts,
        tariffs: Tariffs,
        utilities: Utilities
      })
  );
  return store;
}
