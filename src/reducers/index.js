import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth';
import gameReducer from './game';
import companyReducer from './company';
import errorReducer from './error';

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  company: companyReducer,
  error: errorReducer,
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
