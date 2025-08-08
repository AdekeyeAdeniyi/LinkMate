"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatMessage, LiveChatContextProps } from "../components/types";

const LiveChatContext = createContext<LiveChatContextProps | undefined>(undefined);

export const LiveChatProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessages] = useState<ChatMessage | null>(null);

  const addMessage = (message: ChatMessage) => {
    setMessages(message);
  };

  const clearMessages = () => {
    setMessages(null);
  };

  return <LiveChatContext.Provider value={{ message, addMessage, clearMessages }}>{children}</LiveChatContext.Provider>;
};

export const useLiveChatContext = () => {
  const context = useContext(LiveChatContext);
  if (!context) {
    throw new Error("useLiveChat must be used within a LiveChatProvider");
  }
  return context;
};
