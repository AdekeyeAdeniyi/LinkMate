import AIChat from "./components/AIChat";
import { LiveChatProvider } from "./context/LiveChatContext";
import { ReplicaProvider } from "./context/ReplicaContext";

export default function Home() {
  return (
    <ReplicaProvider>
      <LiveChatProvider>
        <AIChat />
      </LiveChatProvider>
    </ReplicaProvider>
  );
}
