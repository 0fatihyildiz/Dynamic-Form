import React from "react";
import ReactDOM from "react-dom/client";
import App from ".";

import { Provider } from 'react-redux';
import { store } from "./store";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </React.StrictMode>
);
