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

  // Filter the items based on the search term
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  // Get the checked items, the active filtered items, and whether all the filtered items are checked
  // This is used to determine if which items can be bulk rendered or not
  const {
    checkedItems,
    activeFilteredItems,
    allFilteredChecked,
    filteredActiveItems,
  } = useMemo<{
    checkedItems: ClientComposition[]; // All checked items that haven't been rendered to Lottie JSON yet
    activeFilteredItems: ClientComposition[]; // Filtered items that haven't been rendered to Lottie JSON yet
    allFilteredChecked: boolean; // Whether all filtered active items are checked
    filteredActiveItems: ClientComposition[]; // Filtered items that haven't been rendered to Lottie JSON yet (same as activeFilteredItems)
  }>(() => {
    const activeFiltered = filteredItems.filter((item) => !item.lottieJSON);
    const filteredActive = filteredItems.filter((item) => !item.lottieJSON);
    return {
      checkedItems: items.filter((item) => item.checked && !item.lottieJSON),
      activeFilteredItems: activeFiltered,
      allFilteredChecked:
        filteredActive.length > 0 &&
        filteredActive.every((item) => item.checked),
      filteredActiveItems: filteredActive,
    };
  }, [items, filteredItems]);

  const toggleAll = useCallback(
    (checked: boolean) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          filteredActiveItems.some(
            (filteredItem) => filteredItem.id === item.id
          )
            ? { ...item, checked }
            : item
        )
      );
    },
    [filteredActiveItems]
  );

  const toggleItem = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && !item.lottieJSON
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }, []);

  /**
   * A callback function that is used in the useRenderQueue hook.
   * It renders a single composition to Lottie JSON payload.
   */
  const onQueueItemRender = async (item: ClientComposition) => {
    try {
      // I don't use react query here, because the loading state is handled in the useRenderQueue hook
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

  const { addToQueue, queue, isProcessing } = useRenderQueue(onQueueItemRender);

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
