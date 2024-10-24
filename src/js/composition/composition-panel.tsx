import React from "react";

import { RenderCompositions } from "./components/render-compositions";

export const CompositionPanel: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-8">Compositions</h1>
      <RenderCompositions />
    </div>
  );
};
export default CompositionPanel;
