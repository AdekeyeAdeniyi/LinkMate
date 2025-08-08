import { X } from "lucide-react";
import { SettingsPanelProps } from "./types";
import LanguageSelector from "./LanguageSelector";
import ToggleSwitch from "./ToggleSwitch";

const SettingsPanel: React.FC<SettingsPanelProps> = ({ show, onClose, isDark, currentLanguage, setCurrentLanguage, settings, setSettings }) => {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} aria-label="Close settings" />
      <div className={`fixed right-0 top-0 h-full w-96 ${isDark ? "bg-black/90" : "bg-white/90"} backdrop-blur-xl border-l ${isDark ? "border-white/20" : "border-black/20"} z-50 overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>Settings</h2>
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-full ${
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black hover:bg-black/20"
              } flex items-center justify-center transition-colors duration-200`}
              aria-label="Close settings">
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6">
            <LanguageSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} isDark={isDark} />

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>Voice Input</label>
              <ToggleSwitch checked={settings.voiceEnabled} onChange={(e) => setSettings((prev) => ({ ...prev, voiceEnabled: e.target.checked }))} isDark={isDark} />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>Text-to-Speech</label>
              <ToggleSwitch checked={settings.ttsEnabled} onChange={(e) => setSettings((prev) => ({ ...prev, ttsEnabled: e.target.checked }))} isDark={isDark} />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}>Font Size: {settings.fontSize}px</label>
              <input
                type="range"
                min="12"
                max="20"
                value={settings.fontSize}
                onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isDark ? "bg-white/20" : "bg-black/20"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
