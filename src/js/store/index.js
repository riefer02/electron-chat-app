// Warnung! Berühren Sie diese Dateien nicht! Da sie wichtige Reduzierungsdateien enthalten
// Redux-Header Dateien
import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";

export default function configureStore() {
  const middlewares = [reduxThunk];
  const store = createStore(
    combineReducers({
      chats: chatReducer,
      auth: authReducer,
    }),
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
