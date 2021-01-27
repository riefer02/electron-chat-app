import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import chatReducer from '../reducers/chats';
import authReducer from '../reducers/auth';
import appReducer from '../reducers/app';
import settingsReducer from '../reducers/settings';
import appMiddleware from './middlewares/app';

export default function configureStore() {
  const middlewares = [reduxThunk, appMiddleware];

  const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT_SUCCESS') {
      Object.keys(state).forEach((sk) => {
        if (state[sk].savable) {
          return;
        }
        state[sk] = undefined;
      });
    }
    return mainReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
