import React, { useState } from "react";

import { SearchBar } from "./search-bar";
import { CompositionList } from "./composition-list";
import { ControlPanel } from "./control-panel";
import { Checkbox } from "../../../shared/components/ui/checkbox";
import { Composition } from "../../types";

type RenderCompositionsProps = {
  compositions: Composition[];
};

export const RenderCompositions: React.FC<RenderCompositionsProps> = ({
  compositions,
}) => {
  const [selectedCompositions, setSelectedCompositions] = useState<number[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: number) => {
    setSelectedCompositions((prev) =>
      prev.includes(id) ? prev.filter((compId) => compId !== id) : [...prev, id]
    );
  };

  const handleBulkCheck = (checked: boolean) => {
    if (checked) {
      setSelectedCompositions(compositions.map((comp) => comp.id));
    } else {
      setSelectedCompositions([]);
    }
  };

  const filteredCompositions = compositions.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex items-center mb-4">
        <Checkbox
          id="check-all"
          checked={selectedCompositions.length === compositions.length}
          onCheckedChange={(checked) => handleBulkCheck(checked as boolean)}
          className="mr-2 border-teal-500 text-teal-500"
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <CompositionList
        compositions={filteredCompositions}
        selectedCompositions={selectedCompositions}
        onCheckboxChange={handleCheckboxChange}
      />
      <ControlPanel selectedCount={selectedCompositions.length} />
    </div>
  );
};
export default RenderCompositions;
