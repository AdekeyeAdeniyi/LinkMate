import Image from "next/image";
import { Bot, Globe, Moon, Settings, Sun } from "lucide-react";
import { ChatHeaderProps, languages } from "./types";
import Logo from "../../../public/favicon.png";

const ChatHeader: React.FC<ChatHeaderProps> = ({ isDark, currentLanguage, onToggleLanguage, onToggleTheme, onOpenSettings }) => {
  return (
    <div className={`${isDark ? "bg-black/50" : "bg-white/50"} backdrop-blur-xl border-b ${isDark ? "border-white/10" : "border-black/10"} p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10  flex items-center justify-center`}>
          <Image src={Logo} alt="logo" />
        </div>
        <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>LinkMate AI</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleLanguage}
          className={`flex items-center gap-2 px-3 py-2 rounded-full ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"} transition-all duration-200`}
          aria-label="Toggle language">
          <Globe size={16} />
          <span className="text-sm">{languages[currentLanguage].code}</span>
        </button>

        <button
          onClick={onToggleTheme}
          className={`w-10 h-10 rounded-full ${
            isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
          } flex items-center justify-center transition-colors duration-200`}
          aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onOpenSettings}
          className={`w-10 h-10 rounded-full ${
            isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
          } flex items-center justify-center transition-colors duration-200`}
          aria-label="Open settings">
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
