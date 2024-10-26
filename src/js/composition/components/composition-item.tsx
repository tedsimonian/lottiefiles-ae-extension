import React, { useState } from "react";
import { Loader2, Copy, Download } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Button } from "../../../shared/components/ui/button";

import { Composition, CompositionRenderItem } from "../../types";
import { cn } from "../../../shared/utils";

type CompositionItemProps = {
  item: CompositionRenderItem;
  onToggle: (id: number) => void;
  onRender: (item: Composition) => void;
};

export const CompositionItem: React.FC<CompositionItemProps> = ({
  item,
  onToggle,
  onRender,
}: CompositionItemProps) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy JSON");
  const isDisabled = item.rendering || !!item.lottieJSON;

  const handleCopyJSON = () => {
    if (item.lottieJSON) {
      navigator.clipboard.writeText(JSON.stringify(item.lottieJSON, null, 2));
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
              "ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              isDisabled ? "line-through text-muted-foreground" : ""
            )}
          >
            {item.name}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          {item.rendering && (
            <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
          )}
          {item.lottieJSON && (
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
      {item.lottieJSON && isAccordionOpen && (
        <div className="mt-4 space-y-4 my-4">
          <div className="w-full h-64 bg-gray-800 rounded-md overflow-hidden">
            <DotLottieReact
              data={item.lottieJSON}
              autoplay
              loop
              style={{ width: "100%", height: "100%" }}
            />
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
