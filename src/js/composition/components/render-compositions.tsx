import React, { useCallback, useMemo, useState } from "react";

import { SearchBar } from "./search-bar";
import { CompositionList } from "./composition-list";
import { ControlPanel } from "./control-panel";
import { Checkbox } from "../../../shared/components/ui/checkbox";

import { ClientComposition } from "../../types";
import { evalTS } from "../../lib/utils/bolt";
import { LottieAnimation } from "../../../jsx/global";
import { useRenderQueue } from "../useRenderQueue";

const renderCompositionToLottieJSONPayload = async (
  comp: ClientComposition
): Promise<LottieAnimation> => {
  return evalTS("convertCompositionToLottieJSONPayload", comp.id);
};

export const RenderCompositions: React.FC<{
  compositions: ClientComposition[];
}> = ({ compositions }) => {
  const [items, setItems] = useState(compositions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const { checkedItems, activeFilteredItems, allFilteredChecked } = useMemo<{
    checkedItems: ClientComposition[];
    activeFilteredItems: ClientComposition[];
    allFilteredChecked: boolean;
  }>(() => {
    const activeFiltered = filteredItems.filter((item) => !item.lottieJSON);
    return {
      checkedItems: items.filter((item) => item.checked && !item.lottieJSON),
      activeFilteredItems: activeFiltered,
      allFilteredChecked:
        activeFiltered.length > 0 &&
        activeFiltered.every((item) => item.checked),
    };
  }, [items, filteredItems]);

  const toggleAll = useCallback((checked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.lottieJSON ? item : { ...item, checked }))
    );
  }, []);

  const toggleItem = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && !item.lottieJSON
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }, []);

  const onQueueItemRender = async (item: ClientComposition) => {
    try {
      const data = await renderCompositionToLottieJSONPayload(item);
      // Update the item with the Lottie JSON payload
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, lottieJSON: data } : prevItem
        )
      );
    } catch (error) {
      console.error(`Error rendering composition: ${item.name}`, error);
    }
  };

  const { addToQueue, queue, isProcessing, processedItems } =
    useRenderQueue(onQueueItemRender);

  const singleRender = (item: ClientComposition) => {
    if (!item.lottieJSON) {
      addToQueue([item]);
    }
  };

  const bulkRender = () => {
    addToQueue(checkedItems);
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <Checkbox
          id="check-all"
          checked={allFilteredChecked}
          onCheckedChange={(checked) => toggleAll(checked as boolean)}
          disabled={activeFilteredItems.length === 0}
          className="mr-2 border-teal-500 text-teal-500"
        />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <CompositionList
        items={filteredItems}
        queue={queue}
        onToggle={toggleItem}
        onRender={singleRender}
      />
      <ControlPanel
        selectedCount={checkedItems.length}
        isRendering={isProcessing}
        onRender={bulkRender}
      />
    </div>
  );
};

export default RenderCompositions;
