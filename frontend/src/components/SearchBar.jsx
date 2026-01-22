export default function SearchBar({ query, setQuery, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      onSearch();
    }
  };

  return (
    <div className="w-full flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for documents... (e.g., 'machine learning')"
        className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 
                   text-white placeholder-slate-400
                   focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                   transition-all duration-300"
      />
      <button
        onClick={onSearch}
        disabled={loading}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500
                   text-white font-semibold shadow-lg
                   hover:from-purple-600 hover:to-amber-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 transform hover:scale-105
                   active:scale-95"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Searching...
          </span>
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}
