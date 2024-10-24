import React, { useEffect, useState } from "react";

import { RenderCompositions } from "./components/render-compositions";
import { Composition } from "../types";
import { evalTS } from "../lib/utils/bolt";
import { useQuery } from "react-query";

const getAllCompositionsInProject = async (): Promise<Composition[]> => {
  return evalTS("getAllCompositionsInProject");
};

export const CompositionPanel: React.FC = () => {
  const { data, isLoading } = useQuery(
    "compositions",
    getAllCompositionsInProject
  );

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Compositions</h1>
        {isLoading && <div>Loading...</div>}
        {data && <RenderCompositions compositions={data} />}
      </div>
    </div>
  );
};
export default CompositionPanel;
