import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">

        <div className="pl-4 text-gray-400">
          🔍
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services (e.g. Plumber, Electrician)"
          className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>

      </div>
    </form>
  );
};

export default SearchBar;