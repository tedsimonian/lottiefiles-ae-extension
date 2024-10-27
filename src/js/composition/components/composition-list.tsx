import React from "react";

import { CompositionItem } from "../components/composition-item";
import { ClientComposition } from "../../types";
import { RenderQueueItem } from "../useRenderQueue";

type CompositionListProps = {
  items: ClientComposition[];
  queue: RenderQueueItem[];
  onToggle: (id: number) => void;
  onRender: (item: ClientComposition) => void;
};

export const CompositionList: React.FC<CompositionListProps> = ({
  items,
  queue,
  onToggle,
  onRender,
}: CompositionListProps) => {
  return (
    <div className="flex-grow overflow-auto">
      {items.map((item) => {
        const queueStatus = queue.find((q) => q.item.id === item.id)?.status;
        return (
          <CompositionItem
            key={item.id}
            item={item}
            queueStatus={queueStatus}
            onToggle={onToggle}
            onRender={onRender}
          />
        );
      })}
    </div>
  );
};

export default CompositionList;
