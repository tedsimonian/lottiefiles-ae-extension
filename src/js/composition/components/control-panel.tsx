import React from "react";

import { Button } from "../../../shared/components/ui/button";

type ControlPanelProps = {
  selectedCount: number;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedCount,
}: ControlPanelProps) => {
  return (
    <div className="mt-4 flex justify-center self-end w-full">
      <Button
        variant="default"
        className="bg-teal-500 hover:bg-teal-600 text-white w-full"
      >
        Render ({selectedCount})
      </Button>
    </div>
  );
};

export default ControlPanel;
