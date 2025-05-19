import React from "react";
import ReactDOM from "react-dom";

import Routing from "./routing";
import * as serviceWorker from "./serviceWorker";
import { I18nextProvider } from "react-i18next";

import './App.css';
import App from "./App";
import i18n from "./i18n";

//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Routing>
      <App />
    </Routing>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
serviceWorker.unregister();
