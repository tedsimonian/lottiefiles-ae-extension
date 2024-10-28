import React, { useState } from "react";
import { Loader2, Copy, Play, Check } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Button } from "../../../shared/components/ui/button";

import { ClientComposition } from "../../types";
import { cn, copyToClipboard } from "../../../shared/utils";
import { RenderQueueItem } from "../useRenderQueue";

type CompositionItemProps = {
  item: ClientComposition;
  queueStatus?: RenderQueueItem["status"];
  onToggle: (id: number) => void;
  onRender: (item: ClientComposition) => void;
};

export const CompositionItem: React.FC<CompositionItemProps> = ({
  item,
  queueStatus,
  onToggle,
  onRender,
}: CompositionItemProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy JSON");

  const isRendering = queueStatus === "processing";
  const isRendered = !!item.lottieJSON;
  const isDisabled = queueStatus === "pending" || isRendering || isRendered;

  /**
   * The Clipboard API functionality is not supported in Adobe CEP, we are using a deprecated method to copy the JSON to the clipboard.
   * It will require further investigation, as to why the clipboard API does not work in Adobe CEP.
   */
  const handleCopyJSON = () => {
    if (item.lottieJSON) {
      copyToClipboard(JSON.stringify(item.lottieJSON, null, 2));
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy JSON"), 2000);
    }
  };

  return (
    <div className="w-full h-full border-b border-gray-700">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-2 flex-grow">
          <Checkbox
            id={`item-${item.id}`}
            checked={item.checked}
            onCheckedChange={() => onToggle(item.id)}
            disabled={isDisabled}
            className="border-teal-500 text-teal-500"
          />
          <label
            htmlFor={`item-${item.id}`}
            className={cn(
              "ml-2 text-sm font-medium leading-none",
              isDisabled ? "opacity-50" : "",
              isRendered ? "line-through" : ""
            )}
          >
            {item.name}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          {!isRendered && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRender(item)}
              disabled={isDisabled}
              className="text-white border-teal-500 bg-teal-500 hover:bg-teal-700 hover:border-teal-700 hover:text-white disabled:opacity-50"
            >
              {isRendering ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
          {isRendered && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="text-white border-teal-500 bg-teal-500 hover:bg-teal-700 hover:border-teal-700 hover:text-white"
            >
              {isAccordionOpen ? "Close Preview" : "Show Preview"}
            </Button>
          )}
        </div>
      </div>
      {isRendered && isAccordionOpen && (
        <div className="mt-4 space-y-4 my-4">
          <div className="w-full h-64 bg-gray-300 shadow-md rounded-md text-black overflow-hidden">
            {item.lottieJSON && (
              <DotLottieReact
                data={item.lottieJSON}
                autoplay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyJSON}
              className="text-white border-teal-500 bg-teal-500 hover:bg-teal-700 hover:border-teal-700 hover:text-white"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copyButtonText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompositionItem;
