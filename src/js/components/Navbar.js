import React from "react";
import { Link, useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const message = useSelector((state) => state.message);
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            onClick={() => {
              history.goBack();
            }}
            className="btn btn-outline-primary"
          >
            Back
          </button>
          <Link to="/settings" className="btn btn-outline-success ml-2">
            Settings
          </Link>
          {/* {message} */}
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>

          <Link to="/" className="btn btn-outline-success ml-2">
            Login
          </Link>
          {user && (
            <button
              onClick={() => dispatch(logout())}
              to="/"
              className="btn btn-outline-danger ml-2"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
