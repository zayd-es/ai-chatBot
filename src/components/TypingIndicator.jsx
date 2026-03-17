import chatgpt from "../assets/chatgptLogo.svg";

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-6">
      <img src={chatgpt} alt="Bot" className="w-8 h-8 rounded-full mt-1" />
      <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex gap-1 items-center">
        <div
          className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
