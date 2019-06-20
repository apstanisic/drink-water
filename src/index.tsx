import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import init, { bootstrapNotifications } from "./core/bootstrap";
import store from "./state/store";
import "./style/styles";

const startApp = async () => {
  console.log("App started");
  try {
    await init();
  } catch (error) {
    console.log("Init error");
    console.error(error);
  }
  console.log("init passed");

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
  );

  await bootstrapNotifications();
};

/* Check if it is running as a web app,
   if it's native check for corodova to init
*/
if (!window.cordova) {
  startApp();
} else {
  document.addEventListener("deviceready", startApp, false);
}
