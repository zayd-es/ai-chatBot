import send from "../assets/send.svg";

const ChatInput = ({ input, setInput, handleSend }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 mb-4 px-4">
      <div className="flex items-center gap-2 w-full max-w-3xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ background: "rgba(28,30,58,1)" }}
          className="flex-1 p-3 rounded-xl text-sm text-white/80 placeholder-white/30 outline-none border border-white/10"
          type="text"
          placeholder="Send a message..."
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
          style={{ background: "rgba(28,30,58,1)" }}
        >
          <img src={send} alt="Send" className="w-4 h-4 invert opacity-70" />
        </button>
      </div>
      <p className="text-xs text-white/30 text-center">
        ChatGPT August 20 version
      </p>
    </div>
  );
};

export default ChatInput;
