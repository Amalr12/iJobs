import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchTermChange,
  onSearch,
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="w-full flex flex-col sm:flex-row gap-3 items-center"
    >
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
      >
        <Search />
      </button>
    </form>
  );
}