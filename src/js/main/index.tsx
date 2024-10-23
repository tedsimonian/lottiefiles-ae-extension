import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { initBolt } from "../lib/utils/bolt";
import apolloClient from "../lib/utils/apolloClient";

import MainPanel from "./main-panel";

import "../shared/global.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <MainPanel />
    </ApolloProvider>
  </React.StrictMode>
);
