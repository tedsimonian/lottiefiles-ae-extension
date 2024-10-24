import React from "react";

import { Button } from "../../../shared/components/ui/button";

type ControlPanelProps = {
  selectedCount: number;
  totalCount: number;
  onBulkCheck: () => void;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedCount,
  totalCount,
  onBulkCheck,
}: ControlPanelProps) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <Button
        onClick={onBulkCheck}
        variant="outline"
        className="text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white"
      >
        {selectedCount === totalCount ? "Uncheck All" : "Check All"}
      </Button>
      <Button
        variant="default"
        className="bg-teal-500 hover:bg-teal-600 text-white"
      >
        Render ({selectedCount})
      </Button>
    </div>
  );
};

export default ControlPanel;
