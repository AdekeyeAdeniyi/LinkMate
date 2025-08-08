import { useEffect, useRef, useState } from "react";
import { ChatContainerProps } from "./types";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import AIAgentSidebar from "./AIAgentsList";
import { useLiveChatContext } from "../context/LiveChatContext";

const ChatContainer: React.FC<ChatContainerProps> = ({ isTyping, isDark, fontSize, onSpeak, onCopy, copiedId }) => {
  const { message } = useLiveChatContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        chatContainerRef.current!.scrollTo({
          top: chatContainerRef.current!.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isTyping, message]);

  return (
    <div className="relative flex flex-1 overflow-hidden space-y-4 gap-6">
      <AIAgentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div ref={chatContainerRef} className={`w-full space-y-4 p-4 overflow-y-auto ${isCollapsed ? "ml-16 md:ml-20" : "ml-80"} transition-all duration-300 ease-in-out`}>
        <Message handlerScroll={scrollToBottom} isDark={isDark} fontSize={fontSize} onSpeak={onSpeak} onCopy={onCopy} copiedId={copiedId} />

        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatContainer;
