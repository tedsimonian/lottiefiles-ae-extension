import React from "react";
import { useQuery } from "react-query";
import { Loader2 } from "lucide-react";

import { RenderCompositions } from "./components/render-compositions";
import { EmptyData } from "../../shared/components/empty-data";

import { evalTS } from "../lib/utils/bolt";
import { ClientComposition } from "../types";

const getAllCompositionsInProject = async (): Promise<ClientComposition[]> => {
  const compositions = await evalTS("getAllCompositionsInProject");
  return compositions.map((comp) => ({
    ...comp,
    checked: false,
    lottieJSON: null,
  }));
};

export const CompositionPanel: React.FC = () => {
  const { data, isLoading } = useQuery(
    "compositions",
    getAllCompositionsInProject
  );

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-4">
      <div className="container mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Compositions to Lottie</h1>
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            Loading Compositions...
          </div>
        )}
        {data && <RenderCompositions compositions={data} />}
        {!data && !isLoading && (
          <EmptyData
            className="border-white text-white"
            message="No compositions found"
          />
        )}
      </div>
    </div>
  );
};
export default CompositionPanel;
