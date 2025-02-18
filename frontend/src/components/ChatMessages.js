import { useEffect, useRef } from "react";

export default function ChatMessages({ selectedBot, conversations }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 slim-scrollbar">
      {selectedBot ? (
        conversations.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.startsWith("Hello") ? "justify-start" : "justify-end"} space-x-2`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${msg.startsWith("Hello") ? "bg-gray-200" : "bg-blue-500 text-white"}`}
            >
              {msg}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Select a chatbot to start conversation.</p>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
