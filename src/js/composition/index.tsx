import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";

import { CompositionPanel } from "./composition-panel";

import { initBolt } from "../lib/utils/bolt";
import { queryClient } from "../lib/utils/reactQueryClient";

import "../global.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CompositionPanel />
    </QueryClientProvider>
  </React.StrictMode>
);
