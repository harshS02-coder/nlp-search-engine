// ResultList.jsx
import ResultCard from './ResultCard';

export default function ResultList({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <ResultCard key={result.id} result={result} index={index} />
      ))}
    </div>
  );
}