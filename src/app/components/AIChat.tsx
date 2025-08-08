"use client";
import { useCallback, useState } from "react";
import { ChatSettings, languages } from "./types";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import StatusBar from "./StatusBar";
import ChatInput from "./ChatInput";
import SettingsPanel from "./SettingsPanel";
import ReplicaSelectorModal from "./SelectReplica";
import { useReplicaContext } from "../context/ReplicaContext";
import { replicaService } from "../services/replicaService";
import { useLiveChatContext } from "../context/LiveChatContext";

const AIChat: React.FC = () => {
  const { selectedReplica } = useReplicaContext();
  const { addMessage } = useLiveChatContext();

  // ==================== STATE MANAGEMENT ====================
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [_, setError] = useState<string | null>(null);

  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecording] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<ChatSettings>({
    voiceEnabled: true,
    ttsEnabled: true,
    fontSize: 16,
    highContrast: false,
  });
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // ==================== EVENT HANDLERS ====================

  /**
   * Toggles between dark and light theme
   */
  const toggleTheme = useCallback((): void => {
    setIsDark((prev) => !prev);
  }, [setIsDark]);

  /**
   * Cycles through available languages
   */
  const toggleLanguage = useCallback((): void => {
    const languageCodes = Object.keys(languages);
    const currentIndex = languageCodes.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languageCodes.length;
    setCurrentLanguage(languageCodes[nextIndex]);
  }, [currentLanguage]);

  /**
   * Handles sending a new message
   */
  const handleSend = useCallback(async (): Promise<void> => {
    const message = inputText.trim();

    if (!message || !selectedReplica?.ownerID || !selectedReplica?.uuid) return;

    setInputText("");
    addMessage({
      id: Date.now(),
      content: message,
      role: "user",
    });

    setIsTyping(true);

    try {
      const data = await replicaService.getChatCompletion(selectedReplica.ownerID, selectedReplica.uuid, inputText);
      setInputText("");

      if (data?.success) {
        addMessage({
          id: Date.now() + 999,
          content: data.content,
          role: "assistant",
        });
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, selectedReplica]);

  /**
   * Toggles voice recording state
   */
  // const toggleRecording = useCallback((): void => {
  //   if (!settings.voiceEnabled) return;

  //   // setIsRecording((prev) => {
  //   //   const newState = !prev;

  //   //   // Simulate recording and converting to text
  //   //   if (newState) {
  //   //     setTimeout(() => {
  //   //       setIsRecording(false);
  //   //       setInputText("This is a simulated voice input");
  //   //     }, 2000);
  //   //   }

  //   //   return newState;
  //   // });
  // }, [settings.voiceEnabled]);

  const startRecording = () => {};

  const stopRecording = () => {};

  /**
   * Uses Web Speech API to speak text
   */
  const handleSpeak = useCallback(
    (text: string): void => {
      if (!settings.ttsEnabled) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      speechSynthesis.speak(utterance);
    },
    [currentLanguage, settings.ttsEnabled]
  );

  /**
   * Copies text to clipboard and shows feedback
   */
  const handleCopy = useCallback((text: string, id: number): void => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  }, []);

  if (!selectedReplica) {
    return <ReplicaSelectorModal />;
  }

  return (
    <div className={`flex flex-col h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <ChatHeader isDark={isDark} currentLanguage={currentLanguage} onToggleLanguage={toggleLanguage} onToggleTheme={toggleTheme} onOpenSettings={() => setShowSettings(true)} />

      <StatusBar isDark={isDark} currentLanguage={currentLanguage} isRecording={isRecording} />

      <ChatContainer isTyping={isTyping} isDark={isDark} fontSize={settings.fontSize} onSpeak={handleSpeak} onCopy={handleCopy} copiedId={copiedId} />

      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSend}
        startRecording={startRecording}
        stopRecording={stopRecording}
        isRecording={isRecording}
        voiceEnabled={settings.voiceEnabled}
        isDark={isDark}
        fontSize={settings.fontSize}
      />

      <SettingsPanel
        show={showSettings}
        onClose={() => setShowSettings(false)}
        isDark={isDark}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
};

export default AIChat;
