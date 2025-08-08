import { languages, LanguageSelectorProps } from "./types";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, setCurrentLanguage, isDark, className = "" }) => {
  return (
    <div className={className}>
      <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>Choose Your Language</label>
      <select
        value={currentLanguage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentLanguage(e.target.value)}
        className={`w-full p-4 ${isDark ? "bg-white/10 text-white border-white/20" : "bg-black/10 text-black border-black/20"} backdrop-blur-lg border rounded-xl focus:outline-none focus:ring-2 ${
          isDark ? "focus:ring-white/30" : "focus:ring-black/30"
        }`}>
        {Object.entries(languages).map(([code, lang]) => (
          <option key={code} value={code} className={isDark ? "bg-gray-900" : "bg-gray-100"}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
