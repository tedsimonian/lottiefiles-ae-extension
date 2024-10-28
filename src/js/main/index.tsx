import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";

import { initBolt } from "../lib/utils/bolt";
import apolloClient from "../lib/utils/apolloClient";
import { queryClient } from "../lib/utils/reactQueryClient";

import MainPanel from "./main-panel";

import "../global.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <MainPanel />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
