import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import HomeView from "./views/Home";
import SettingsView from "./views/Settings";
import WelcomeView from "./views/Welcome";
import ChatView from "./views/Chat";
import configureStore from "./store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { listenToAuthChanges } from "./actions/auth";

const store = configureStore();

export default function App() {
 
  // const sendNotification = () => {
  //  electron.notificationApi.sendNotification("This is my custom message!"); // Emitting Event
  // };

  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact>
              {" "}
              <WelcomeView />
            </Route>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
            <Route path="/settings">
              {" "}
              <SettingsView />
            </Route>{" "}
            <Route path="/home">
              {" "}
              <HomeView />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
