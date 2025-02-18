// components/ChatHistory.js
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { useState } from "react";
import Button from "./ui/Button";
import { Send } from "lucide-react";

export default function ChatHistory() {
  const dispatch = useDispatch();
  const selectedBot = useSelector((state) => state.chat.selectedBot);
  const conversations = useSelector((state) => state.chat.conversations[selectedBot] || []);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (selectedBot && message.trim()) {
      dispatch(addMessage({ botName: selectedBot, message }));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Chat History</h3>
        <Button className="bg-gray-200">LineOff And Estimate</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 slim-scrollbar">
        {selectedBot ? (
          conversations.map((msg, index) => (
            <p key={index} className="text-gray-700">{msg}</p>
          ))
        ) : (
          <p className="text-gray-400">Select a chatbot to start conversation.</p>
        )}
      </div>
      <div className="border-t p-2 flex items-center">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg h-10"
        />
        <Button onClick={handleSend} className="bg-blue-500 text-white rounded-r-lg h-10 flex items-center justify-center px-3">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
