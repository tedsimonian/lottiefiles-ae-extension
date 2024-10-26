import React from "react";

import { CompositionItem } from "../components/composition-item";
import { Composition, CompositionRenderItem } from "../../types";

type CompositionListProps = {
  items: CompositionRenderItem[];
  onToggle: (id: number) => void;
  onRender: (item: Composition) => void;
};

export const CompositionList: React.FC<CompositionListProps> = ({
  items,
  onToggle,
  onRender,
}: CompositionListProps) => {
  return (
    <div className="flex-grow overflow-auto">
      {items.map((item) => (
        <CompositionItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRender={onRender}
        />
      ))}
    </div>
  );
};

export default CompositionList;
