export default function ResultCard({ result, index }) {
  const scorePercentage = result.score ? Math.min(result.score * 100, 100) : 0;
  
  return (
    <div
      className="py-5 border-b border-gray-200 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Title and URL */}
      <div className="mb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-blue-700 hover:underline text-xl font-normal cursor-pointer">
            {result.title || `Document #${result.id}`}
          </h3>
          {result.category && (
            <span className="ml-3 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {result.category}
            </span>
          )}
        </div>
      </div>

      {/* Content Snippet */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-2">
        {result.content || "No content preview available."}
      </p>

      {/* Footer with metadata */}
      <div className="flex items-center text-xs text-gray-500 space-x-4">
        <span>Document ID: {result.id}</span>
        <span>•</span>
        <span className="flex items-center">
          Relevance: 
          <span className="ml-1 font-medium text-green-700">
            {scorePercentage.toFixed(1)}%
          </span>
        </span>
      </div>
    </div>
  );
}
