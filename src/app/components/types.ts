export interface Language {
  name: string;
  code: string;
  flag: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  role: "user" | "assistant";
}

export interface ChatMessageResponse {
  success: boolean;
  items: ChatMessage[] | [];
}

export interface ChatCompletionResponse {
  content: string;
  success: boolean;
}

export interface LiveChatContextProps {
  message: ChatMessage | null;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export interface Replica {
  uuid: string;
  name: string;
  shortDescription: string;
  profileImage: string;
  greetings?: string;
  ownerID?: string;
}

export interface AIAgentSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp?: Date;
}

export interface ChatSettings {
  voiceEnabled: boolean;
  ttsEnabled: boolean;
  fontSize: number;
  highContrast: boolean;
}

export interface WelcomeScreenProps {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  onStartChat: () => void;
}

export interface LanguageSelectorProps {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  isDark: boolean;
  className?: string;
}

export interface ChatHeaderProps {
  isDark: boolean;
  currentLanguage: string;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export interface StatusBarProps {
  isDark: boolean;
  currentLanguage: string;
  isRecording: boolean;
}

export interface MessageProps {
  isDark: boolean;
  fontSize: number;
  onSpeak: (text: string) => void;
  onCopy: (text: string, id: number) => void;
  copiedId: number | null;
  handlerScroll: () => void;
}

export interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSend: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
  voiceEnabled: boolean;
  isDark: boolean;
  fontSize: number;
}

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDark: boolean;
}

export interface SettingsPanelProps {
  show: boolean;
  onClose: () => void;
  isDark: boolean;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  settings: ChatSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChatSettings>>;
}

export interface ChatContainerProps {
  isTyping: boolean;
  isDark: boolean;
  fontSize: number;
  onSpeak: (text: string) => void;
  onCopy: (text: string, id: number) => void;
  copiedId: number | null;
}

// ==================== CONSTANTS ====================

export const languages: Record<string, Language> = {
  en: { name: "English", code: "EN", flag: "🇺🇸" },
  es: { name: "Español", code: "ES", flag: "🇪🇸" },
  fr: { name: "Français", code: "FR", flag: "🇫🇷" },
  de: { name: "Deutsch", code: "DE", flag: "🇩🇪" },
  it: { name: "Italiano", code: "IT", flag: "🇮🇹" },
  pt: { name: "Português", code: "PT", flag: "🇵🇹" },
  ru: { name: "Русский", code: "RU", flag: "🇷🇺" },
  zh: { name: "中文", code: "ZH", flag: "🇨🇳" },
  ja: { name: "日本語", code: "JA", flag: "🇯🇵" },
  ko: { name: "한국어", code: "KO", flag: "🇰🇷" },
};

export const AI_RESPONSES: string[] = [
  "That's an interesting question! Let me help you with that.",
  "I understand what you're asking. Here's what I think...",
  "Great point! Based on what you've said, I would suggest...",
  "Thank you for sharing that with me. My response is...",
  "I'm here to help! Let me provide you with some information...",
];
