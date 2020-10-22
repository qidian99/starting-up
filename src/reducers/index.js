import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AUTH_ACTIONS } from '../util';

const DEFAULT_AUTH_STATE = {
  jwt: null,
  user: null
}

const authReducer = (state = DEFAULT_AUTH_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGNUP:
    case AUTH_ACTIONS.LOGIN:
      const { user, jwt } = action;
      return { ...state, user, jwt };
    case AUTH_ACTIONS.LOGOUT:
      return DEFAULT_AUTH_STATE;
    default:
      return state;
  }
};

const DEFAULT_GAME_STATE = {
  width: -1,
  height: -1,
  users: [],
  name: [],
}
const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case 'GAME_START': {
      const { name, width, height, users } = action;
      return {
        ...state,
        name, width, height, users,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
// persistor.purge();
export { store, persistor };
