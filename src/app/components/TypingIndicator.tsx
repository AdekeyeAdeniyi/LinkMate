const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2 p-4">
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
    <span className="text-sm text-gray-500">AI is typing...</span>
  </div>
);

export default TypingIndicator;
