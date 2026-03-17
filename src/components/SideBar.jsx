import msgIcon from "../assets/message.svg";
import add from "../assets/add-30.png";
import chatgptLogo from "../assets/chatgpt.svg";
import homeIcon from "../assets/home.svg";
import savedIcon from "../assets/bookmark.svg";
import rocketIcon from "../assets/rocket.svg";

const Sidebar = ({ handleQuery, onNewChat, setView, currentView }) => {
  return (
    <div className="w-64 h-screen flex flex-col border-r border-white/10 bg-[#030220] px-5 py-5 overflow-hidden">
      {/* 1. L-Header: New Chat Button */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-1 py-1">
          <img src={chatgptLogo} alt="Logo" className="w-6 h-6" />
          <span className="font-semibold text-sm tracking-widest text-white">
            CHATGPT
          </span>
        </div>

        <button
          className="flex items-center gap-2 px-2 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition text-sm text-white"
          onClick={onNewChat}
        >
          <img src={add} alt="Add" className="w-4 h-4 invert" />
          New Chat
        </button>

        {/* 2. Recent Queries: Quick Buttons */}
        <div className="flex flex-col gap-1 mt-4">
          <p className="text-[10px] text-white/30 px-2 mb-1 uppercase font-bold tracking-widest">
            Recent
          </p>

          <button
            onClick={handleQuery}
            value="What is Programming?"
            className="flex text-sm text-white/70 truncate items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition text-left group"
          >
            <img
              src={msgIcon}
              alt=""
              className="w-4 h-4 invert opacity-40 group-hover:opacity-100"
            />
            What is Programming?
          </button>

          <button
            onClick={handleQuery}
            value="What is React JS?"
            className="flex text-sm text-white/70 truncate items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition text-left group"
          >
            <img
              src={msgIcon}
              alt=""
              className="w-4 h-4 invert opacity-40 group-hover:opacity-100"
            />
            What is React JS?
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
        <div
          onClick={() => setView("chat")}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${
            currentView === "chat"
              ? "bg-white/10 text-white font-medium shadow-sm"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          <img src={homeIcon} alt="Home" className="w-4 h-4" />
          Home
        </div>

        {/* Saved Button */}
        <div
          onClick={() => setView("saved")}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${
            currentView === "saved"
              ? "bg-amber-500/10 text-amber-500 font-medium"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          <img
            src={savedIcon}
            alt="Saved"
            className={`w-4 h-4 ${currentView === "saved" ? "invert-0" : "opacity-60"}`}
          />
          Saved Messages
        </div>

        {/* Upgrade Button */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm text-white/40 cursor-not-allowed group">
          <img
            src={rocketIcon}
            alt="Pro"
            className="w-4 h-4 opacity-40 group-hover:opacity-100"
          />
          Upgrade to Pro
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
