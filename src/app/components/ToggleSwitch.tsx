import { ToggleSwitchProps } from "./types";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, isDark }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? (isDark ? "bg-white" : "bg-black") : isDark ? "bg-white/20" : "bg-black/20"}`}>
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0"}`}
          style={{
            backgroundColor: checked ? (isDark ? "black" : "white") : isDark ? "white" : "black",
          }}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;
