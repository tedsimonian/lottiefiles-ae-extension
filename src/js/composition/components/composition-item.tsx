import { ChevronRight } from "lucide-react";

import { Checkbox } from "../../../shared/components/ui/checkbox";

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
      <ChevronRight className="h-5 w-5 text-teal-500" />
    </div>
  );
};

export default CompositionItem;
