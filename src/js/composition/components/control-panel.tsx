import { Button } from "../../../shared/components/ui/button";

type ControlPanelProps = {
  onRender: () => void;
  isRendering: boolean;
  selectedCount: number;
};

export const ControlPanel = ({
  selectedCount,
  isRendering,
  onRender,
}: ControlPanelProps) => {
  return (
    <div className="mt-4 flex justify-center self-end w-full">
      <Button
        variant="default"
        disabled={selectedCount === 0 || isRendering}
        className="bg-teal-500 hover:bg-teal-600 text-white w-full"
        onClick={onRender}
      >
        {isRendering ? "Rendering..." : `Render (${selectedCount})`}
      </Button>
    </div>
  );
};

export default ControlPanel;
