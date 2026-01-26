// import { useState } from "react";
// import SearchBar from "../components/SearchBar";
// import ResultList from "../components/ResultList";
// import { searchDocuments } from "../services/api";

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError("");
//     setResults([]);

//     try {
//       const data = await searchDocuments(query);
//       setResults(data.results || []);
//     } catch {
//       setError("Failed to fetch results. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative px-4 bg-gradient-to-b from-slate-900 via-blue-900 to-teal-800">
//       {/* Decorative radial glow */}
//       <div className="pointer-events-none absolute inset-0 opacity-40"
//            aria-hidden="true">
//         <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),transparent_70%)]"></div>
//         <div className="absolute bottom-0 left-16 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.25),transparent_70%)]"></div>
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto pt-24">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300">
//             🔍 NLP Text Search Engine
//           </h1>
//           <p className="text-slate-300">
//             Semantic document retrieval powered by TF‑IDF and Word2Vec
//           </p>
//         </div>

//         {/* Search Card */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
//           <SearchBar
//             query={query}
//             setQuery={setQuery}
//             onSearch={handleSearch}
//             loading={loading}
//           />
//         </div>

//         {/* States */}
//         {error && (
//           <p className="text-red-400 text-center mt-6">{error}</p>
//         )}

//         {!loading && query && results.length === 0 && !error && (
//           <p className="text-slate-300 text-center mt-6">
//             No results found. Try a different query.
//           </p>
//         )}

//         {/* Results */}
//         <div className="mt-8">
//           <ResultList results={results} />
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultList from "../components/ResultList";
import { searchDocuments } from "../services/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);
    setSearchPerformed(true);

    try {
      const data = await searchDocuments(query);
      setResults(data.results || []);
    } catch {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-6 pb-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔍</span>
            <h1 className="text-xl font-normal">
              <span className="text-blue-600 font-medium">NLP</span>
              <span className="text-red-500 font-medium">Search</span>
            </h1>
          </div>
          {searchPerformed && (
            <div className="text-sm text-gray-600">
              {results.length} results
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`transition-all duration-500 ${searchPerformed ? 'pt-0' : 'pt-32'}`}>
        <div className="max-w-2xl mx-auto px-6">
          {/* Logo - Only show when no search performed */}
          {!searchPerformed && (
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-6xl font-light mb-2">
                <span className="text-blue-600">N</span>
                <span className="text-red-500">L</span>
                <span className="text-yellow-500">P</span>
                <span className="text-blue-600"> </span>
                <span className="text-green-600">S</span>
                <span className="text-red-500">e</span>
                <span className="text-yellow-500">a</span>
                <span className="text-blue-600">r</span>
                <span className="text-green-600">c</span>
                <span className="text-red-500">h</span>
              </h1>
            </div>
          )}

          {/* Search Box */}
          <div className="mb-8">
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>

          {/* Search tips - only show before first search */}
          {!searchPerformed && (
            <div className="text-center text-sm text-gray-600 animate-fade-in">
              Semantic document retrieval powered by TF-IDF and Word2Vec
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className={`max-w-2xl mx-auto px-6 ${searchPerformed ? 'mt-6' : ''}`}>
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '450ms'}}></div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="py-12 text-center">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* No Results */}
          {!loading && searchPerformed && results.length === 0 && !error && (
            <div className="py-12 text-center">
              <p className="text-gray-600 mb-2">Your search did not match any documents.</p>
              <p className="text-sm text-gray-500">Try different keywords</p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6 pb-12">
              <ResultList results={results} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      {searchPerformed && (
        <footer className="py-8 border-t border-gray-200 mt-12">
          <div className="max-w-2xl mx-auto px-6 text-center text-xs text-gray-500">
            Powered by TF-IDF and Word2Vec semantic analysis
          </div>
        </footer>
      )}
    </div>
  );
}