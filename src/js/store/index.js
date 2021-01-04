import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import chatReducer from "../reducers/chats";

export default function configureStore() {
  const middlewares = [reduxThunk];
  const store = createStore(
    combineReducers({
      chats: chatReducer,
    }),
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
