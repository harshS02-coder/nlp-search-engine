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


import { useState, useEffect } from "react";
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

  // Floating particles effect
  useEffect(() => {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute rounded-full opacity-0 animate-float`;
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const color = Math.random() > 0.5 ? 'bg-purple-300' : 'bg-amber-300';
      
      particle.classList.add(color);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div className="min-h-screen relative px-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.3),transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(251,146,60,0.2),transparent_70%)] animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-16 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(244,114,182,0.18),transparent_70%)] animate-pulse-slower"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating particles */}
      <div id="particles-container" className="pointer-events-none absolute inset-0"></div>

      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 translate-x-1/2 -translate-y-1/2 bg-amber-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2 translate-y-1/2 bg-fuchsia-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl mx-auto pt-20 md:pt-24">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4 p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-amber-500/20 backdrop-blur-sm border border-amber-400/20 animate-float-slow">
            <div className="text-3xl">🔍</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-300 animate-gradient bg-[length:200%_auto]">
            NLP Text Search Engine
          </h1>
          <p className="text-slate-200/90 text-lg animate-fade-in-up animation-delay-300">
            Semantic document retrieval powered by{" "}
            <span className="text-amber-300 font-semibold">TF‑IDF</span> and{" "}
            <span className="text-purple-300 font-semibold">Word2Vec</span>
          </p>
        </div>

        {/* Search Card with animations */}
        <div className={`bg-white/5 backdrop-blur-xl border border-purple-400/20 rounded-3xl shadow-2xl shadow-purple-500/10 p-6 md:p-8 
          transition-all duration-500 hover:bg-white/10 hover:border-amber-400/30 hover:shadow-amber-500/20
          ${searchPerformed ? 'animate-card-pop' : 'animate-fade-in-up animation-delay-500'}`}>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            loading={loading}
          />
          
          {/* Search tips */}
          {!searchPerformed && (
            <div className="mt-6 animate-fade-in">
              <p className="text-slate-400 text-sm text-center">
                💡 Try searching for: "machine learning algorithms" or "natural language processing techniques"
              </p>
            </div>
          )}
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="mt-10 animate-fade-in">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-amber-400 rounded-full animate-spin animation-delay-500"></div>
              </div>
              <div className="text-center">
                <p className="text-purple-300 font-medium mb-2">Searching semantic space...</p>
                <div className="flex space-x-2 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* States */}
        {error && (
          <div className="mt-8 animate-shake">
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="inline-block p-3 rounded-full bg-red-500/20 mb-3">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && searchPerformed && results.length === 0 && !error && (
          <div className="mt-10 animate-fade-in">
            <div className="text-center">
              <div className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-sm mb-4">
                <span className="text-3xl">🔎</span>
              </div>
              <p className="text-slate-300 text-lg mb-2">No results found</p>
              <p className="text-slate-400">
                Try a different query or adjust your search terms
              </p>
            </div>
          </div>
        )}

        {/* Results with staggered animation */}
        <div className="mt-10">
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between animate-slide-in-left">
                <h2 className="text-2xl font-bold text-white">
                  Search Results
                  <span className="ml-3 text-amber-300">
                    ({results.length} {results.length === 1 ? 'document' : 'documents'})
                  </span>
                </h2>
                <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm">
                  Relevance Score
                </div>
              </div>
              <ResultList results={results} />
            </div>
          )}
        </div>

        {/* Footer Animation */}
        {searchPerformed && !loading && (
          <div className="mt-12 pt-8 border-t border-white/10 animate-fade-in">
            <p className="text-center text-slate-400 text-sm">
              ✨ Powered by advanced NLP techniques • Real-time semantic analysis
            </p>
          </div>
        )}
      </div>

      {/* Add custom animations to tailwind.config.js */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-100px) rotate(180deg); }
          90% { opacity: 1; }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes card-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-in-left {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}