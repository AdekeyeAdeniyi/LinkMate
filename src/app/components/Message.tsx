import { ChatMessage, MessageProps } from "./types";
import { useEffect, useState } from "react";
import { replicaService } from "../services/replicaService";
import { useReplicaContext } from "../context/ReplicaContext";
import { Check, Copy, Volume2 } from "lucide-react";
import { useLiveChatContext } from "../context/LiveChatContext";
import ReactMarkdown from "react-markdown";

const Message: React.FC<MessageProps> = ({ handlerScroll, isDark, fontSize, onSpeak, onCopy, copiedId }) => {
  const { selectedReplica } = useReplicaContext();
  const { message, clearMessages } = useLiveChatContext();

  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[] | []>([]);

  useEffect(() => {
    const fetchReplicas = async () => {
      try {
        const data = await replicaService.getChatHistory(selectedReplica?.ownerID, selectedReplica?.uuid);

        if (data?.success && data.items) {
          setMessages(data.items);
          handlerScroll();
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchReplicas();
  }, [selectedReplica?.uuid]);

  useEffect(() => {
    if (message) {
      setMessages((prev) => [...prev, message]);
      clearMessages();
    }
  }, [message]);

  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl ${
                message.role === "user"
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDark
                  ? "bg-white/10 backdrop-blur-lg text-white border border-white/20"
                  : "bg-black/10 backdrop-blur-lg text-black border border-black/20"
              } group relative`}>
              <div className="leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>

              {message.role === "assistant" && (
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => onSpeak(message.content)}
                    className={`w-8 h-8 rounded-full ${
                      isDark ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/20 hover:bg-black/30 text-black"
                    } flex items-center justify-center transition-colors duration-200`}
                    aria-label="Read message aloud">
                    <Volume2 size={14} />
                  </button>
                  <button
                    onClick={() => onCopy(message.content, message.id)}
                    className={`w-8 h-8 rounded-full ${
                      isDark ? "bg-white/20 hover:bg-white/30 text-white" : "bg-black/20 hover:bg-black/30 text-black"
                    } flex items-center justify-center transition-colors duration-200`}
                    aria-label="Copy message">
                    {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default Message;
