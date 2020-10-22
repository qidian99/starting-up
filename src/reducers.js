import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const DEFAULT_AUTH_STATE = {
  token: null,
  user: null
}

const authReducer = (state = DEFAULT_AUTH_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      const { user } = action;
      return { ...state, user };
    }
    case 'LOGOUT_USER': {
      return {};
    }
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
