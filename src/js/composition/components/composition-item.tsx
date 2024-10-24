import { ChevronRight, Loader2 } from "lucide-react";

import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Button } from "../../../shared/components/ui/button";
import { Progress } from "../../../shared/components/ui/progress";

import { CompositionRenderItem } from "../../types";
import { cn } from "../../../shared/utils";

type CompositionItemProps = {
  item: CompositionRenderItem;
  isRendering: boolean;
  onToggle: (id: number) => void;
  onRender: (id: number) => void;
};

export const CompositionItem: React.FC<CompositionItemProps> = ({
  item,
  onToggle,
  onRender,
  isRendering,
}: CompositionItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700">
      <div className="flex items-center justify-between space-x-2 flex-grow">
        <div className="flex items-center">
          <Checkbox
            id={`item-${item.id}`}
            checked={item.checked}
            onCheckedChange={() => onToggle(item.id)}
            disabled={
              item.status === "rendering" || item.status === "completed"
            }
            className="border-teal-500 text-teal-500"
          />
          <label
            htmlFor={`item-${item.id}`}
            className={cn(
              "ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-grow",
              item.status === "completed"
                ? "line-through text-muted-foreground"
                : ""
            )}
          >
            {item.name}
          </label>
        </div>
        <div className="flex items-center justify-center space-x-5 flex-grow">
          {item.status === "rendering" && (
            <div className="flex items-center space-x-2 flex-grow">
              <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
              <Progress value={item.progress} className="w-full" />
            </div>
          )}
          {item.status === "completed" && (
            <span className="text-sm text-green-600">Completed</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRender(item.id)}
          className="bg-teal-500 hover:bg-teal-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
          disabled={
            item.status === "rendering" ||
            isRendering ||
            item.status === "completed"
          }
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default CompositionItem;
