import React from "react";
import { InboxIcon } from "lucide-react";

type EmptyDataProps = {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: string;
};

/**
 * Component to display when there is no data available
 */
export const EmptyData = ({
  message = "No data available",
  icon,
  className = "",
  borderStyle = "dashed",
  borderColor = "border-muted-foreground",
}: EmptyDataProps) => {
  const borderClasses = `border-2 ${borderStyle} ${borderColor} rounded-lg`;

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${borderClasses} ${className}`}
    >
      {icon || <InboxIcon className="w-12 h-12 text-muted-foreground mb-4" />}
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyData;
