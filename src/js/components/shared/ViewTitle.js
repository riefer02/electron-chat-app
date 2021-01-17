import React from "react";
import { useHistory } from "react-router-dom";

export default function ViewTitle({ text, children }) {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
      <div> {children}</div>
    </div>
  );
}
