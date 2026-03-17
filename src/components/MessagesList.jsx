import chatgpt from "../assets/chatgptLogo.svg";
import userIcon from "../assets/user-icon.png";
import TypingIndicator from "./TypingIndicator";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageList = ({ messages, msgEnd, isLoading, onSave, view }) => {
  const messagesToDisplay =
    view === "saved" ? messages.filter((m) => m.isSaved) : messages;

  return (
    <div className="flex-1 overflow-y-auto pt-12  md:pt-6 px-16 h-screen flex flex-col gap-6 max-w-3xl mx-auto w-full">
      {messagesToDisplay.map((msg, index) => {
        const realIndex = messages.findIndex((m) => m === msg);

        return (
          <div key={index} className="group relative flex items-start gap-3">
            {msg.isBot && (
              <img
                src={chatgpt}
                alt="Bot"
                className="w-8 h-8 rounded-full mt-1"
              />
            )}

            <div
              className={`flex-1 flex flex-col ${!msg.isBot ? "items-end" : "items-start"}`}
            >
              <div
                className={`text-white/90 text-sm px-4 py-3 rounded-2xl max-w-xl transition-all ${
                  msg.isSaved
                    ? "ring-1 ring-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                    : ""
                }`}
                style={{
                  background: msg.isBot
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="markdown-container overflow-hidden">
                  <ReactMarkdown
                    children={msg.text}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            children={String(children).replace(/\n$/, "")}
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => onSave(realIndex)}
                className={`mt-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  msg.isSaved
                    ? "text-amber-500 opacity-100"
                    : "text-white/20 opacity-0 group-hover:opacity-100 hover:text-white"
                }`}
              >
                {msg.isSaved ? "★ Unsave Message" : "☆ Save Message"}
              </button>
            </div>

            {!msg.isBot && (
              <img
                src={userIcon}
                alt="User"
                className="w-8 h-8 rounded-full mt-1"
              />
            )}
          </div>
        );
      })}

      {isLoading && <TypingIndicator />}
      <div ref={msgEnd} />
    </div>
  );
};

export default MessageList;
