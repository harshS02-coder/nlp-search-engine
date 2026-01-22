export default function ResultCard({ result, index }) {
  const scorePercentage = result.score ? Math.min(result.score * 100, 100) : 0;
  
  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 
                 hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300 
                 hover:scale-[1.02] cursor-pointer animate-fade-in-up
                 shadow-lg hover:shadow-purple-500/20"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header with title and category */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white flex-1 pr-4">
          {result.title || `Document #${result.id}`}
        </h3>
        {result.category && (
          <span className="px-3 py-1 rounded-full text-xs font-medium 
                         bg-purple-500/20 text-purple-300 border border-purple-400/30
                         whitespace-nowrap">
            {result.category}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-slate-300 leading-relaxed mb-4 line-clamp-3">
        {result.content || "No content preview available."}
      </p>

      {/* Footer with score */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-sm text-slate-400">
          Document ID: <span className="text-amber-300 font-medium">{result.id}</span>
        </span>
        
        <div className="flex items-center space-x-3">
          <div className="w-32 h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          <span className="text-amber-300 text-sm font-semibold min-w-[3rem] text-right">
            {scorePercentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
