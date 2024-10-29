import { useQuery } from "react-query";
import { Loader2 } from "lucide-react";

import { RenderCompositions } from "./components/render-compositions";
import { EmptyData } from "../../shared/components/empty-data";

import { evalTS } from "../lib/utils/bolt";
import { ClientComposition } from "../types";

const getAllCompositionsInProject = async (): Promise<ClientComposition[]> => {
  const compositions = await evalTS("getAllCompositionsInProject");
  // We need to map the compositions to the client type, and add a checked and lottieJSON property
  return compositions.map((comp) => ({
    ...comp,
    checked: false,
    lottieJSON: null,
  }));
};

export const CompositionPanel = () => {
  // I use react query to fetch the compositions, so we can handle loading states better
  const { data, isLoading } = useQuery(
    "compositions",
    getAllCompositionsInProject
  );

  const isEmpty = (!data || data.length === 0) && !isLoading;

  return (
    <div className="w-full  p-4">
      <div className="container mx-auto px-4 py-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Compositions to Lottie</h1>
        {isLoading && (
          <div className="flex justify-center items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin " />
            Loading Compositions...
          </div>
        )}
        {!isEmpty && data && <RenderCompositions compositions={data} />}
        {isEmpty && (
          <EmptyData
            className="border-gray-800 text-gray-800"
            message="No compositions found"
          />
        )}
      </div>
    </div>
  );
};

export default CompositionPanel;
