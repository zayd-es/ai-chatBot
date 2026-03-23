import msgIcon from "../assets/message.svg";
import add from "../assets/add-30.png";
import chatgptLogo from "../assets/chatgpt.svg";
import homeIcon from "../assets/home.svg";
import savedIcon from "../assets/bookmark.svg";
import rocketIcon from "../assets/rocket.svg";

const groupConversations = (conversations) => {
  const now = new Date();
  const today = [];
  const yesterday = [];
  const older = [];

  conversations.forEach((conv) => {
    const diff = (now - new Date(parseInt(conv.id))) / (1000 * 60 * 60 * 24);
    if (diff < 1) today.push(conv);
    else if (diff < 2) yesterday.push(conv);
    else older.push(conv);
  });

  return { today, yesterday, older };
};

const Sidebar = ({
  onNewChat,
  setView,
  currentView,
  onClose,
  conversations,
  onDeleteConversation,
  onSelectConversation,
}) => {
  const { today, yesterday, older } = groupConversations(conversations);

  const renderGroup = (label, group) =>
    group.length > 0 && (
      <div key={label}>
        <p className="text-[10px] text-white/30 px-2 mt-3 mb-1 uppercase font-bold tracking-widest">
          {label}
        </p>
        {group.map((conv) => (
          <div key={conv.id} className="flex items-center gap-1 group/item">
            <button
              onClick={() => onSelectConversation(conv.id)}
              className="flex-1 flex text-sm text-white/70 truncate items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition text-left"
            >
              <img
                src={msgIcon}
                alt=""
                className="w-4 h-4 invert opacity-40 group-hover/item:opacity-100 shrink-0"
              />
              <span className="truncate">{conv.title}</span>
            </button>
            <button
              onClick={() => onDeleteConversation(conv.id)}
              className="opacity-0 group-hover/item:opacity-100 text-white/30 hover:text-red-400 transition px-1 text-xs shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    );

  return (
    <div className="w-full md:w-64 h-dvh flex flex-col border-r border-white/10 bg-[#030220] px-5 py-5 overflow-y-auto">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-2">
            <img src={chatgptLogo} alt="Logo" className="w-6 h-6" />
            <span className="font-semibold text-sm tracking-widest text-white">
              CHATGPT
            </span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-white/50 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        <button
          className="flex items-center gap-2 px-2 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition text-sm text-white"
          onClick={onNewChat}
        >
          <img src={add} alt="Add" className="w-4 h-4 invert" />
          New Chat
        </button>

        <div className="flex flex-col gap-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-white/20 px-2 mt-2">
              No conversations yet
            </p>
          ) : (
            <>
              {renderGroup("Today", today)}
              {renderGroup("Yesterday", yesterday)}
              {renderGroup("Older", older)}
            </>
          )}
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
