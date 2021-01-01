import React from "react";
import { Provider } from "react-redux";
import HomeView from "./views/Home";
import SettingsView from "./views/Settings";
import RegisterView from "./views/Register";
import LoginView from "./views/Login";
import ChatView from "./views/Chat";
import configureStore from "./store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const store = configureStore()

export default function App() {
  // const sendNotification = () => {
  //  electron.notificationApi.sendNotification("This is my custom message!"); // Emitting Event
  // };

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Switch>
            <Route path="/chat/:id">
              <ChatView />
            </Route>
            <Route path="/settings">
              {" "}
              <SettingsView />
            </Route>{" "}
            <Route path="/register">
              {" "}
              <RegisterView />
            </Route>
            <Route path="/login">
              {" "}
              <LoginView />
            </Route>
            <Route path="/">
              {" "}
              <HomeView />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
