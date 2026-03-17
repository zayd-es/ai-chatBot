import { useEffect, useRef, useState } from "react";
import { processMessage } from "./openAi";
import MessageList from "./components/MessagesList";
import ChatInput from "./components/ChatInput";
import Sidebar from "./components/SideBar";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [view, setView] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chat_history");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            text: "Hello! I'm your AI assistant. How can I help? 🚀",
            isBot: true,
          },
        ];
  });
  const [isLoading, setIsLoading] = useState(false);

  const prevLengthRef = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      msgEnd.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevLengthRef.current = messages.length;
  }, [messages.length]);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setIsLoading(true);
    const res = await processMessage(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
    setIsLoading(false);
  };

  const handleQuery = async (e) => {
    const text = e.currentTarget.value;
    if (!text) return;
    setMessages((prev) => [...prev, { text, isBot: false }]);
    setIsLoading(true);
    const res = await processMessage(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
    setIsLoading(false);
  };

  const handleNewChat = () => {
    localStorage.removeItem("chat_history");
    setMessages([
      { text: "Hello! I'm your AI assistant. How can I help? 🚀", isBot: true },
    ]);
  };

  const toggleSaveMessage = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index] = {
        ...updatedMessages[index],
        isSaved: !updatedMessages[index].isSaved,
      };
      return updatedMessages;
    });
  };

  return (
    <div className="h-screen flex bg-[#030220] text-white font-sans overflow-hidden">
      {/* Overlay f mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar
          handleQuery={handleQuery}
          onNewChat={handleNewChat}
          setView={setView}
          currentView={view}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden absolute top-4 left-4 z-10 text-white/70 hover:text-white text-xl"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <MessageList
          messages={messages}
          msgEnd={msgEnd}
          isLoading={isLoading}
          onSave={toggleSaveMessage}
          view={view}
        />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  );
}

export default App;
