import { useRef } from "react";
import { ChatInputProps } from "./types";
import { Mic, MicOff, Send } from "lucide-react";

const ChatInput: React.FC<ChatInputProps> = ({ startRecording, stopRecording, inputText, setInputText, onSend, isRecording, voiceEnabled, isDark, fontSize }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      onSend();
    }
  };

  return (
    <div className={`${isDark ? "bg-black/50" : "bg-white/50"} backdrop-blur-xl border-t ${isDark ? "border-white/10" : "border-black/10"} p-4`}>
      <div className={`flex items-end gap-3 ${isDark ? "bg-white/10" : "bg-black/10"} backdrop-blur-lg rounded-2xl p-3 border ${isDark ? "border-white/20" : "border-black/20"}`}>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={!voiceEnabled}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isRecording
              ? "bg-red-500 text-white animate-pulse"
              : voiceEnabled
              ? isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
              : isDark
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-black/20 text-black/50 cursor-not-allowed"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start voice recording"}>
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Type your message..."
          className={`flex-1 bg-transparent ${isDark ? "text-white placeholder-gray-400" : "text-black placeholder-gray-600"} resize-none outline-none min-h-[44px] max-h-32 py-2`}
          style={{ fontSize: `${fontSize}px` }}
          rows={1}
        />

        <button
          onClick={onSend}
          disabled={!inputText.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            inputText.trim()
              ? isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
              : isDark
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-black/20 text-black/50 cursor-not-allowed"
          }`}
          aria-label="Send message">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
