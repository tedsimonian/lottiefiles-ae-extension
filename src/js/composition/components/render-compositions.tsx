import React, { useCallback, useMemo, useState } from "react";

import { SearchBar } from "./search-bar";
import { CompositionList } from "./composition-list";
import { ControlPanel } from "./control-panel";
import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Composition, CompositionRenderItem } from "../../types";
import { renderItem, RenderProgress } from "../../../shared/utils";

type RenderCompositionsProps = {
  compositions: Composition[];
};

const appendStatusAndProgress = (
  items: Composition[]
): CompositionRenderItem[] => {
  return items.map((item) => ({
    ...item,
    checked: false,
    status: "idle",
    progress: 0,
  }));
};

export const RenderCompositions: React.FC<RenderCompositionsProps> = ({
  compositions,
}) => {
  const [items, setItems] = useState(appendStatusAndProgress(compositions));
  const [searchTerm, setSearchTerm] = useState("");
  const [isRendering, setIsRendering] = useState(false);

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const { checkedItems, activeItems, allChecked } = useMemo(
    () => ({
      checkedItems: items.filter(
        (item) => item.checked && item.status !== "completed"
      ),
      activeItems: items.filter((item) => item.status !== "completed"),
      allChecked:
        items.length > 0 &&
        items.every((item) => item.checked || item.status === "completed"),
    }),
    [items]
  );

  const toggleAll = useCallback((checked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.status !== "completed" ? { ...item, checked } : item
      )
    );
  }, []);

  const toggleItem = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.status !== "completed"
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }, []);

  const updateItemProgress = useCallback(
    (id: number, progress: RenderProgress) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...progress } : item
        )
      );
    },
    []
  );

  const renderSingleItem = useCallback(
    async (id: number) => {
      setIsRendering(true);
      updateItemProgress(id, { status: "rendering", progress: 0 });
      await renderItem(id, (progress) => {
        updateItemProgress(id, {
          progress,
          status: progress === 100 ? "completed" : "rendering",
        });
      });
      setIsRendering(false);
    },
    [updateItemProgress]
  );

  const bulkRender = useCallback(async () => {
    setIsRendering(true);
    for (const item of checkedItems) {
      await renderSingleItem(item.id);
    }
    setIsRendering(false);
  }, [checkedItems, renderSingleItem]);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <Checkbox
          id="check-all"
          checked={allChecked}
          onCheckedChange={(checked) => toggleAll(checked as boolean)}
          disabled={activeItems.length === 0}
          className="mr-2 border-teal-500 text-teal-500"
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <CompositionList
        items={filteredItems}
        onToggle={toggleItem}
        onRender={renderSingleItem}
        isRendering={isRendering}
      />
      <ControlPanel
        selectedCount={checkedItems.length}
        isRendering={isRendering}
        onRender={bulkRender}
      />
    </div>
  );
};
export default RenderCompositions;
