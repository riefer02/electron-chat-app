import { createStore } from "redux";

export default function configureStore() {
  const store = createStore(() => {
    return {
      message: "Hello World",
      data1: "testing 1",
      data2: "testing 2",
    };
  });

  return store;
}
