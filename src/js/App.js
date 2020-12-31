import React from "react";

export default function App() {
  //   debugger;
  const title = "Hello World";
  const enhancedTitle = title + "  - React App!";

  const sendNotification = () => {
    alert("Hello World!");
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
}
