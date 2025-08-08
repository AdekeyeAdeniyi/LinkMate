import { Globe } from "lucide-react";
import { languages, StatusBarProps } from "./types";

const StatusBar: React.FC<StatusBarProps> = ({ isDark, currentLanguage, isRecording }) => {
  return (
    <div
      className={`${isDark ? "bg-black/30" : "bg-white/30"} backdrop-blur-lg border-b ${isDark ? "border-white/10" : "border-black/10"} px-4 py-2 flex items-center gap-4 text-sm ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" aria-label="Connected"></div>
        <span>Connected</span>
      </div>
      <div className="flex items-center gap-2">
        <Globe size={14} />
        <span>{languages[currentLanguage].name}</span>
      </div>
      {isRecording && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-label="Recording"></div>
          <span>Recording...</span>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
