/* eslint-disable no-unused-vars */
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
  const [isLoading, setIsLoading] = useState(false);

  const [currentId, setCurrentId] = useState(() => {
    return localStorage.getItem("current_chat_id") || Date.now().toString();
  });

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(`chat_${currentId}`);
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            text: "Hello! I'm your AI assistant. How can I help? 🚀",
            isBot: true,
          },
        ];
  });

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("conversations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const firstUserMsg = messages.find((m) => !m.isBot);
    if (firstUserMsg) {
      const title = firstUserMsg.text.slice(0, 30);
      setConversations((prev) => {
        const exists = prev.find((c) => c.id === currentId);
        if (exists && exists.title === title) return prev;

        const updated = [
          { id: currentId, title },
          ...prev.filter((c) => c.id !== currentId),
        ];
        localStorage.setItem("conversations", JSON.stringify(updated));
        return updated;
      });
    }
    localStorage.setItem(`chat_${currentId}`, JSON.stringify(messages));
    localStorage.setItem("current_chat_id", currentId);
  }, [messages, currentId]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const newUserMsg = { text, isBot: false };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const res = await processMessage(text);
      setMessages((prev) => [...prev, { text: res, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong. 😕", isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  const handleQuery = (e) => {
    sendMessage(e.currentTarget.value);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem("conversations", JSON.stringify(updated));
      return updated;
    });
    localStorage.removeItem(`chat_${id}`);
    if (id === currentId) handleNewChat();
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    setCurrentId(newId);
    setMessages([
      { text: "Hello! I'm your AI assistant. How can I help? 🚀", isBot: true },
    ]);
  };

  const toggleSaveMessage = (index) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, isSaved: !msg.isSaved } : msg,
      ),
    );
  };
  const handleSelectConversation = (id) => {
    const saved = localStorage.getItem(`chat_${id}`);
    if (saved) {
      setCurrentId(id);
      setMessages(JSON.parse(saved));
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-dvh flex bg-[#030220] text-white font-sans overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 md:static z-30 h-full w-full md:w-64 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          handleQuery={handleQuery}
          onNewChat={handleNewChat}
          setView={setView}
          currentView={view}
          onClose={() => setSidebarOpen(false)}
          conversations={conversations}
          onDeleteConversation={handleDeleteConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden relative">
        <button
          className="md:hidden absolute top-4 left-4 z-10 text-white/70 hover:text-white"
          onClick={() => setSidebarOpen(true)}
        >
          <div className="flex flex-col gap-1.25 p-2 rounded-lg hover:bg-white/10 transition">
            <span className="block w-5 h-0.5 bg-current rounded-full"></span>
            <span className="block w-5 h-0.5 bg-current rounded-full"></span>
            <span className="block w-3 h-0.5 bg-current rounded-full"></span>
          </div>
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
