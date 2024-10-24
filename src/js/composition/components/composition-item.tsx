import { ChevronRight } from "lucide-react";

import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Button } from "../../../shared/components/ui/button";

type Composition = {
  id: string;
  name: string;
};

type CompositionItemProps = {
  composition: Composition;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
};

export const CompositionItem: React.FC<CompositionItemProps> = ({
  composition,
  isSelected,
  onCheckboxChange,
}: CompositionItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700">
      <div className="flex items-center">
        <Checkbox
          id={composition.id}
          checked={isSelected}
          onCheckedChange={() => onCheckboxChange(composition.id)}
          className="border-teal-500 text-teal-500"
        />
        <label htmlFor={composition.id} className="ml-2 text-sm font-medium">
          {composition.name}
        </label>
      </div>
      <Button
        variant="ghost"
        className="bg-teal-500 hover:bg-teal-800 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
        size="icon"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};

export default CompositionItem;
