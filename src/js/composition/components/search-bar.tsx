import { Input } from "../../../shared/components/ui/input";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <Input
      type="text"
      placeholder="Search compositions..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-grow placeholder-gray-400"
    />
  );
};

export default SearchBar;
