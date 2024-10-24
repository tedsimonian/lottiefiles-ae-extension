import React from "react";

import { CompositionItem } from "../components/composition-item";

type Composition = {
  id: string;
  name: string;
};

type CompositionListProps = {
  compositions: Composition[];
  selectedCompositions: string[];
  onCheckboxChange: (id: string) => void;
};

export const CompositionList: React.FC<CompositionListProps> = ({
  compositions,
  selectedCompositions,
  onCheckboxChange,
}: CompositionListProps) => {
  return (
    <div className="flex-grow overflow-auto">
      {compositions.map((comp) => (
        <CompositionItem
          key={comp.id}
          composition={comp}
          isSelected={selectedCompositions.includes(comp.id)}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
};

export default CompositionList;
