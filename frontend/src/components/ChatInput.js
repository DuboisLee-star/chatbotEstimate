import { useState } from "react";
import Button from "./ui/Button";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t p-2 flex items-center">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 border rounded-l-lg h-10"
      />
      <Button
        onClick={() => {
          onSendMessage(message);
          setMessage("");
        }}
        className="bg-blue-500 text-white rounded-r-lg h-10 flex items-center justify-center px-3"
      >
        <Send size={18} />
      </Button>
    </div>
  );
}
