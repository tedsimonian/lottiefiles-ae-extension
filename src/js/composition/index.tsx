import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";

import CompositionPanel from "./composition";

import "../shared/global.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CompositionPanel />
  </React.StrictMode>
);
