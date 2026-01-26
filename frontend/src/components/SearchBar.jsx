export default function SearchBar({ query, setQuery, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      onSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search documents..."
          className="w-full px-6 py-4 rounded-full border border-gray-300 
                     text-gray-700 text-lg
                     focus:outline-none focus:shadow-lg focus:border-gray-400
                     hover:shadow-md
                     transition-all duration-200"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     px-6 py-2 rounded-full 
                     bg-blue-500 hover:bg-blue-600
                     text-white font-medium text-sm
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
