import React from "react";

import { CompositionItem } from "../components/composition-item";
import { CompositionRenderItem } from "../../types";

type CompositionListProps = {
  items: CompositionRenderItem[];
  onToggle: (id: number) => void;
  onRender: (id: number) => void;
  isRendering: boolean;
};

export const CompositionList: React.FC<CompositionListProps> = ({
  items,
  onToggle,
  onRender,
  isRendering,
}: CompositionListProps) => {
  return (
    <div className="flex-grow overflow-auto">
      {items.map((item) => (
        <CompositionItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRender={onRender}
          isRendering={isRendering}
        />
      ))}
    </div>
  );
};

export default CompositionList;
