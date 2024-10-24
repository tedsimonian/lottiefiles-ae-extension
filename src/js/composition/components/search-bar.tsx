import React from "react";

import { Input } from "../../../shared/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}: SearchBarProps) => {
  return (
    <Input
      type="text"
      placeholder="Search compositions..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400"
    />
  );
};

export default SearchBar;
