import React, { useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";

import { SearchBar } from "./search-bar";
import { CompositionList } from "./composition-list";
import { ControlPanel } from "./control-panel";
import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Composition, CompositionRenderItem } from "../../types";
import { evalTS } from "../../lib/utils/bolt";
import { LottieAnimation } from "../../../jsx/global";

type RenderCompositionsProps = {
  compositions: Composition[];
};

const appendStatusAndProgress = (
  items: Composition[]
): CompositionRenderItem[] => {
  return items.map((item) => ({
    ...item,
    lottieJSON: null,
    checked: false,
    rendering: false,
  }));
};

const renderCompositionToLottieJSONPayload = async (
  comp: Composition
): Promise<LottieAnimation> => {
  return evalTS("convertCompositionToLottieJSONPayload", comp.id);
};

export const RenderCompositions: React.FC<RenderCompositionsProps> = ({
  compositions,
}) => {
  const [items, setItems] = useState(appendStatusAndProgress(compositions));
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: renderComp, isLoading } = useMutation(
    renderCompositionToLottieJSONPayload
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const { checkedItems, activeFilteredItems, allFilteredChecked } = useMemo(
    () => ({
      checkedItems: items.filter(
        (item) => item.checked && !item.rendering && !item.lottieJSON
      ),
      activeFilteredItems: filteredItems.filter(
        (item) => !item.rendering && !item.lottieJSON
      ),
      allFilteredChecked:
        filteredItems.length > 0 &&
        filteredItems.every((item) => item.checked || !!item.lottieJSON),
    }),
    [items, filteredItems]
  );

  const toggleAll = useCallback(
    (checked: boolean) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          filteredItems.some((filteredItem) => filteredItem.id === item.id) &&
          !item.rendering &&
          !item.lottieJSON
            ? { ...item, checked }
            : item
        )
      );
    },
    [filteredItems]
  );

  const toggleItem = useCallback((id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && !item.rendering && !item.lottieJSON
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  }, []);

  const updateItemProgress = useCallback(
    (id: number, rendering: boolean, lottieJSON: LottieAnimation | null) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, rendering, lottieJSON } : item
        )
      );
    },
    []
  );

  const renderSingleItem = useCallback(
    async (item: Composition) => {
      updateItemProgress(item.id, true, null);
      await renderComp(item, {
        onSuccess: (data) => {
          updateItemProgress(item.id, false, data);
        },
        onError: (error, variables, context) => {
          alert(`Error rendering composition: ${variables.name}`);
          updateItemProgress(item.id, false, null);
        },
      });
    },
    [updateItemProgress]
  );

  const bulkRender = useCallback(async () => {
    for (const item of checkedItems) {
      await renderSingleItem(item);
    }
  }, [checkedItems, renderSingleItem]);

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
        onToggle={toggleItem}
        onRender={renderSingleItem}
      />
      <ControlPanel
        selectedCount={checkedItems.length}
        isRendering={isLoading}
        onRender={bulkRender}
      />
    </div>
  );
};
export default RenderCompositions;
