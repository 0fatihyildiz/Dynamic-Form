import React from "react";
import ReactDOM from "react-dom/client";
import App from ".";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
