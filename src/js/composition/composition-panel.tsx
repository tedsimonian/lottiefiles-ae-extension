import React, { useState } from "react";

import { SearchBar } from "./components/search-bar";
import { CompositionList } from "./components/composition-list";
import { ControlPanel } from "./components/control-panel";

type Composition = {
  id: string;
  name: string;
};

export const CompositionPanel: React.FC = () => {
  const [compositions, setCompositions] = useState<Composition[]>([
    { id: "1", name: "Running puppy" },
    { id: "2", name: "Skating puppy" },
    { id: "3", name: "Walking puppy" },
  ]);
  const [selectedCompositions, setSelectedCompositions] = useState<string[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: string) => {
    setSelectedCompositions((prev) =>
      prev.includes(id) ? prev.filter((compId) => compId !== id) : [...prev, id]
    );
  };

  const handleBulkCheck = () => {
    if (selectedCompositions.length === compositions.length) {
      setSelectedCompositions([]);
    } else {
      setSelectedCompositions(compositions.map((comp) => comp.id));
    }
  };

  const filteredCompositions = compositions.filter((comp) =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CompositionList
        compositions={filteredCompositions}
        selectedCompositions={selectedCompositions}
        onCheckboxChange={handleCheckboxChange}
      />
      <ControlPanel
        selectedCount={selectedCompositions.length}
        totalCount={compositions.length}
        onBulkCheck={handleBulkCheck}
      />
    </div>
  );
};
export default CompositionPanel;
