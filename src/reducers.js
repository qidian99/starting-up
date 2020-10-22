import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const DEFAULT_NETWORK_STATE = {
  selectedUser: {
    index: -1,
    detail: {},
  },
};

const DEFAULT_RESOURCE_STATE = {
  selectedTags: {},
  selectedCategories: {},
  searchItem: '',
  selectedResource: {},
};

const DEFAULT_FORUM_STATE = {
  selectedPost: {},
};

const authReducer = (state = {}, action) => {
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

const networkReducer = (state = DEFAULT_NETWORK_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_USER': {
      const { selectedUser } = action;
      return {
        ...state,
        selectedUser, // index, detail
      };
    }
    case 'LOGOUT_USER': {
      return DEFAULT_NETWORK_STATE;
    }
    default:
      return state;
  }
};

const resourceReducer = (state = DEFAULT_RESOURCE_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_TAGS': {
      const { selectedTags } = action;
      return {
        ...state,
        selectedTags,
      };
    }
    case 'UPDATE_SELECTED_CATEGORIES': {
      const { selectedCategories } = action;
      return {
        ...state,
        selectedCategories,
      };
    }
    case 'UPDATE_RESOURCE_SEARCH': {
      const { searchItem } = action;
      return {
        ...state,
        searchItem,
      };
    }
    case 'UPDATE_SELECTED_RESOURCE': {
      const { selectedResource } = action;
      return {
        ...state,
        selectedResource,
      };
    }
    case 'LOGOUT_USER': {
      return DEFAULT_RESOURCE_STATE;
    }
    default:
      return state;
  }
};

const forumReducer = (state = DEFAULT_FORUM_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_POST': {
      const { selectedPost } = action;
      return {
        ...state,
        selectedPost,
      };
    }
    case 'LOGOUT_USER': {
      return DEFAULT_FORUM_STATE;
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  network: networkReducer,
  resource: resourceReducer,
  forum: forumReducer,
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
